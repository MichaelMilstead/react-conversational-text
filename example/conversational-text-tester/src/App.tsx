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
          "This is the first message. I think that... it is a great message.",
        ]}
      />
    </div>
  );
}

export default App;
