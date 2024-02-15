import React, { CSSProperties, useEffect, useState } from "react";

interface ConversationalTextProps {
  /** Array of messages to display */
  messages: string[];

  /** Delay in milliseconds between each character. Default is 40 */
  delayBetweenCharactersMs?: number;

  /** Additional delay in milliseconds after a comma. Default is 500 */
  delayAfterCommaMs?: number;

  /** Additional delay in milliseconds after a sentence (period, exclamation mark, or question mark). Default is 500 */
  delayAfterSentenceMs?: number;

  /** Delay in milliseconds between each message. Default is 1000 */
  delayBetweenMessageMs?: number;

  /** If true, adds a space between messages. Default is true */
  addSpaceBetweenMessages?: boolean;

  /** If true, adds a line break between messages. Default is true */
  lineBreakBetweenMessages?: boolean;

  /** CSS properties to style the component */
  style?: CSSProperties;
}

export default function ConversationalText({
  messages,
  delayBetweenCharactersMs = 40,
  delayAfterCommaMs = 500,
  delayAfterSentenceMs = 500,
  delayBetweenMessageMs = 1000,
  addSpaceBetweenMessages = true,
  lineBreakBetweenMessages = false,
  style,
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
    setCurrentMessage("");
    startCancellableLoop();
    return () => {
      setValidLoopId("");
    };
  }, [messages]);

  useEffect(() => {
    if (validLoopId === "") {
      return;
    }
    printMessages(validLoopId);
  }, [validLoopId]);

  return (
    <span style={{ whiteSpace: "pre-wrap", ...style }}>{currentMessage}</span>
  );
}
