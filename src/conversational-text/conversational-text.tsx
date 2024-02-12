import { useEffect, useState } from "react";

interface ConversationalTextProps {
  messages: string[];
  delayBetweenCharactersMs?: number;
  delayAfterCommaMs?: number;
  delayAfterPeriodMs?: number;
  delayBetweenMessageMs?: number;
}

export default function ConversationalText({
  messages,
  delayBetweenCharactersMs = 30,
  delayAfterCommaMs = 500,
  delayAfterPeriodMs = 500,
  delayBetweenMessageMs = 1000,
}: ConversationalTextProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (currentCharacterIndex < messages[currentMessageIndex].length) {
        const currentCharacter =
          messages[currentMessageIndex][currentCharacterIndex];
        setCurrentMessage((prev) => prev + currentCharacter);
        setCurrentCharacterIndex((prev) => prev + 1);
        let delay = delayBetweenCharactersMs;
        if (currentCharacter === ",") {
          delay = delayAfterCommaMs;
        } else if (currentCharacter === ".") {
          delay = delayAfterPeriodMs;
        }
        setTimeout(() => {
          setIsTyping(true);
        }, delay);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
          setCurrentMessage("");
          setCurrentCharacterIndex(0);
          setIsTyping(true);
        }, delayBetweenMessageMs);
      }
    }
  }, [currentCharacterIndex, currentMessageIndex, isTyping]);

  return (
    <div>
      <p>{currentMessage}</p>
    </div>
  );
}
