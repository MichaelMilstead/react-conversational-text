A React component that prints messages one character at a time, as if typed by a person.

![Demo gif](https://media.giphy.com/media/dqwE5hjgTuhOaU6OSt/giphy.gif)

## Installation

```shell
npm i react-conversational-text
```

## Usage

Import and use the `ConversationalText` component, passing in the list of strings you want printed, along with optional props.

```typescript
import ConversationalText from "react-conversational-text";
import "./App.css";

function App() {
  return (
    <div>
      <ConversationalText
        messages={[
          "This is the first message.",
          "However, this is the second message.",
        ]}
      />
    </div>
  );
}

export default App;
```

## Props

- `messages` (string[]): The list of strings you want to be printed.

Each of the following props is optional and can be used to customize the behavior of the `ConversationalText` component.

- `delayBetweenCharactersMs` (number): The delay in milliseconds between each character. Default is 40ms.
- `delayAfterCommaMs` (number): Additional delay in milliseconds after a comma is printed. Default is 500ms.
- `delayAfterSentenceMs` (number): Additional delay in milliseconds after a sentence-ending punctuation (., !, ?) is printed. Default is 500ms.
- `delayBetweenMessageMs` (number): The delay in milliseconds before starting to print the next message. Default is 1000ms.
- `addSpaceBetweenMessages` (boolean): If true, adds a space between messages. Default is true.
- `lineBreakBetweenMessages` (boolean): If true, adds a line break between messages. Default is false.
- `onMessageComplete` (function): A callback function that is called when each input message is completed. The function receives the index of the completed message as a parameter.
  Example: `onMessageComplete={(messageIndex) => { /* handle completion of message */ }}`
- `onAllMessagesComplete` (function): A callback function that is called when all messages have been completed. This function does not receive any parameters.
  Example: `onAllMessagesComplete={() => { /* handle completion of all messages */ }}`
- `style` (CSSProperties): Custom CSS styles to apply to the span containing the messages. This is an object that can contain any valid CSS property.

## Example Usage

To see an example react app using this package, check out [this repository.](https://github.com/MichaelMilstead/react-conversational-text/tree/main/example/conversational-text-tester)

## Issues and Feature Requests

To report a problem or make a feature request, add a GitHub 'issue' [here.](https://github.com/MichaelMilstead/react-conversational-text/issues/new)
