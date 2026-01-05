import { useState } from "react";
import "./EduChatbot.css";

export default function EduChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I am your education mentor. Ask me about learning paths, roadmaps, or resources.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://backend-atlasify-website.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMsg.text,
            history: messages.map((m) => ({
              role: m.role,
              parts: [{ text: m.text }],
            })),
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">🎓 Education Chatbot</div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.role === "user"
                  ? "chat-message user"
                  : "chat-message bot"
              }
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="chat-message bot">Typing...</div>
          )}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask about your learning path..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
