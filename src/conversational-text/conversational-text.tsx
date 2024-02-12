import React, { useEffect, useState } from "react";

interface ConversationalTextProps {
  messages: string[];
  delayBetweenCharactersMs?: number;
  delayAfterCommaMs?: number;
  delayAfterSentenceMs?: number;
  delayBetweenMessageMs?: number;
  addSpaceBetweenMessages?: boolean;
  lineBreakBetweenMessages?: boolean;
}

export default function ConversationalText({
  messages,
  delayBetweenCharactersMs = 40,
  delayAfterCommaMs = 500,
  delayAfterSentenceMs = 500,
  delayBetweenMessageMs = 1000,
  addSpaceBetweenMessages = true,
  lineBreakBetweenMessages = false,
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

        setCurrentMessage((prev) => prev + currentChar);
        currentCharIndex++;
        await wait(delay);
      }
      currentMessageIndex++;

      if (lineBreakBetweenMessages) {
        setCurrentMessage((prev) => prev + "\n");
      } else if (addSpaceBetweenMessages) {
        setCurrentMessage((prev) => prev + " ");
      }
      await wait(delayBetweenMessageMs);
    }
  };

  useEffect(() => {
    startCancellableLoop();
    return () => {
      setValidLoopId("");
    };
  }, []);

  useEffect(() => {
    if (validLoopId === "") {
      return;
    }
    printMessages(validLoopId);
  }, [validLoopId]);

  return <span style={{ whiteSpace: "pre-wrap" }}>{currentMessage}</span>;
}
