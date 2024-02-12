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
        color: "gold",
      }}
    >
      <ConversationalText
        messages={[
          "This is the first message.",
          "However, this is the second message.",
        ]}
        lineBreakBetweenMessages={true}
      />
    </div>
  );
}

export default App;
