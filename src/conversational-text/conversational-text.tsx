import React, { useEffect, useState } from "react";

interface ConversationalTextProps {
  messages: string[];
  delayBetweenCharactersMs?: number;
  delayAfterCommaMs?: number;
  delayAfterSentenceMs?: number;
  delayBetweenMessageMs?: number;
}

export default function ConversationalText({
  messages,
  delayBetweenCharactersMs = 30,
  delayAfterCommaMs = 500,
  delayAfterSentenceMs = 500,
  delayBetweenMessageMs = 1000,
}: ConversationalTextProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [validLoopId, setValidLoopId] = useState<string>("");

  const startCancellableLoop = (): string => {
    const id = Date.now().toString();
    setValidLoopId(id);
    return id;
  };

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const printMessages = async (id: string) => {
    console.log(validLoopId);
    let currentMessageIndex = 0;
    while (currentMessageIndex < messages.length) {
      let currentCharIndex = 0;
      while (currentCharIndex < messages[currentMessageIndex].length) {
        if (!(validLoopId === id)) {
          return;
        }
        const currentChar = messages[currentMessageIndex][currentCharIndex];
        let delay = delayBetweenCharactersMs;
        if (currentChar === ",") {
          delay += delayAfterCommaMs;
        } else if (
          currentChar === "." ||
          currentChar === "!" ||
          currentChar === "?"
        ) {
          delay += delayAfterSentenceMs;
        }

        setCurrentMessage(
          messages[currentMessageIndex].substring(0, currentCharIndex + 1)
        );
        currentCharIndex++;
        await wait(delay);
      }
      currentMessageIndex++;
    }
  };

  useEffect(() => {
    startCancellableLoop();
  }, []);

  useEffect(() => {
    printMessages(validLoopId);
  }, [validLoopId]);

  return (
    <div>
      <p>{currentMessage}</p>
    </div>
  );
}
