import ConversationalText from "react-conversational-text";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConversationalText
        messages={[
          "This component will print text as if it were being typed, and even pauses for commas!",
          "It will also print multiple messages, with a delay between them.",
        ]}
        lineBreakBetweenMessages={true}
        style={{
          color: "gold",
          fontFamily: "math",
          padding: 20,
          textAlign: "left",
        }}
      />
    </div>
  );
}

export default App;
