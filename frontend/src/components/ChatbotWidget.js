import React, { useState, useRef, useEffect } from "react";

const botImg = "https://img.icons8.com/fluency/96/000000/robot-2.png";
const OPENAI_API_KEY = "5465b5f746msh96e92153a7366cep165cf4jsn9c421897c482"; // <-- Replace with your OpenAI key

const CHAT_WIDTH = 340;
const CHAT_HEIGHT = 420;
const ICON_SIZE = 64;
const PADDING = 24;

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about Excel, charts, or data." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Shared position for both icon and chatbox
  const [position, setPosition] = useState({
    x: window.innerWidth - ICON_SIZE - PADDING,
    y: window.innerHeight - ICON_SIZE - PADDING
  });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const widgetRef = useRef(null);
  const iconRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setPosition(pos => ({
        x: Math.min(pos.x, window.innerWidth - (open ? CHAT_WIDTH : ICON_SIZE) - PADDING),
        y: Math.min(pos.y, window.innerHeight - (open ? CHAT_HEIGHT : ICON_SIZE) - PADDING)
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Drag Handlers (for both icon and chatbox)
  const onMouseDown = (e, type) => {
    if (e.button !== 0) return;
    const rect = (type === "icon" ? iconRef : widgetRef).current.getBoundingClientRect();
    setDragging(type);
    setRel({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top
    });
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const maxW = window.innerWidth - (dragging === "icon" ? ICON_SIZE : CHAT_WIDTH) - PADDING;
    const maxH = window.innerHeight - (dragging === "icon" ? ICON_SIZE : CHAT_HEIGHT) - PADDING;
    setPosition({
      x: Math.max(PADDING, Math.min(maxW, e.pageX - rel.x)),
      y: Math.max(PADDING, Math.min(maxH, e.pageY - rel.y))
    });
    e.stopPropagation();
    e.preventDefault();
  };
  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, rel]);

  // OpenAI Integration
 const handleSend = async () => {
  if (!input.trim() || loading) return;
  const userMsg = input;
  setMessages(prev => [...prev, { from: "user", text: userMsg }]);
  setInput("");
  setLoading(true);

  try {
    const response = await fetch("https://openai80.p.rapidapi.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": OPENAI_API_KEY,
        "X-RapidAPI-Host": "openai80.p.rapidapi.com"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant that helps users with Excel, charts, and spreadsheet tasks."
          },
          {
            role: "user",
            content: userMsg
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();
    console.log("API response:", data); // <--- DEBUG HERE

    if (data && data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content.trim();
      setMessages(prev => [...prev, { from: "bot", text: reply }]);
    } else if (data.error) {
      setMessages(prev => [...prev, { from: "bot", text: `Error: ${data.error.message}` }]);
    } else {
      setMessages(prev => [...prev, { from: "bot", text: "No proper response. Try again later." }]);
    }

  } catch (error) {
    console.error("Fetch error:", error);
    setMessages(prev => [...prev, { from: "bot", text: "Could not reach the server. Check internet or key." }]);
  }

  setLoading(false);
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Styles
  const iconStyle = {
    position: "fixed",
    left: position.x,
    top: position.y,
    zIndex: 1000,
    cursor: "grab",
    width: ICON_SIZE,
    height: ICON_SIZE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const chatStyle = {
    position: "fixed",
    left: position.x,
    top: position.y,
    zIndex: 1000,
    width: CHAT_WIDTH,
    height: CHAT_HEIGHT,
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    animation: "fadeIn 0.3s",
    userSelect: dragging ? "none" : "auto"
  };

  return (
    <>
      {/* Floating Bot Icon */}
      {!open && (
        <div
          ref={iconRef}
          style={iconStyle}
          onMouseDown={e => onMouseDown(e, "icon")}
        >
          <button
            style={{
              border: "3px solid #000",
              boxShadow: "0 0 16px 4px rgb(15, 15, 15), 0 2px 8px rgba(0,0,0,0.22)",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "50%",
              padding: 0,
              width: ICON_SIZE,
              height: ICON_SIZE,
              transition: "box-shadow 0.2s"
            }}
            aria-label="Open Chatbot"
            onClick={() => setOpen(true)}
          >
            <img
              src={botImg}
              alt="Bot"
              style={{ width: ICON_SIZE, height: ICON_SIZE, borderRadius: "50%" }}
              draggable={false}
            />
          </button>
        </div>
      )}

      {/* Chatbox */}
      {open && (
        <div ref={widgetRef} style={chatStyle}>
          {/* Header (Drag handle) */}
          <div
            onMouseDown={e => onMouseDown(e, "chat")}
            style={{
              background: "black",
              padding: "1rem",
              color: "green",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "grab"
            }}
          >
            <span>
              <img src={botImg} alt="Bot" style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 8 }} />
              SheetSleuth AI
            </span>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.4rem",
                cursor: "pointer"
              }}
              aria-label="Close Chat"
              onClick={() => setOpen(false)}
            >×</button>
          </div>
          {/* Chat Body */}
          <div
            style={{
              flex: 1,
              background: "#f7f7fc",
              padding: "1rem",
              overflowY: "auto"
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                  marginBottom: 8
                }}
              >
                <div
                  style={{
                    background: msg.from === "user" ? "#e2e8f0" : "#e2e8f0",
                    color: msg.from === "user" ? "green" : "black",
                    borderRadius: "16px",
                    padding: "0.7em 1.1em",
                    maxWidth: "78%",
                    border: "1px solid rgb(131, 183, 183)",
                    fontSize: "1rem"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ color: "#43B02A", fontStyle: "italic", marginLeft: 5 }}>Bot is typing...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <div
            style={{
              borderTop: "1px solid black",
              display: "flex",
              padding: "0.7rem",
              background: "#fff"
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your charts..."
              style={{
                flex: 1,
                border: "1px solid rgb(13, 14, 14)",
                borderRadius: "16px",
                padding: "0.5em 1em",
                fontSize: "1rem",
                outline: "none",
                color: "#000"
              }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: 8,
                background: "#43B02A",
                color: "black",
                border: "none",
                borderRadius: "16px",
                padding: "0.5em 1.3em",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer"
              }}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;