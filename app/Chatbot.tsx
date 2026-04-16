"use client";
import { useState, useEffect } from "react";

type Message = { text: string; sender: "bot" | "user" };

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi 👋 Welcome! How can we help you today?", sender: "bot" },
  ]);

  const [step, setStep] = useState<
    | "menu"
    | "quoteName"
    | "quoteContact"
    | "contactName"
    | "contactDetails"
    | "questionText"
    | "questionContact"
  >("menu");

  const [input, setInput] = useState("");
  const [lead, setLead] = useState({ name: "", contact: "", question: "" });
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setOpen(true);
  }, 1500);

  return () => clearTimeout(timer);
}, []);

  // 🔥 Message Helpers
  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text, sender: "bot" }]);
      setIsTyping(false);
    }, 800);
  };

  // 🔥 Google Sheets Integration (paste your URL here)
  const sendToGoogleSheets = async (data: any) => {
    try {
      await fetch("https://script.google.com/macros/s/AKfycbz-UEi3DjlEqZd9dCxXcJNkT-XnOgPz2-Q9d-uVC9awElIw3cSTWME9auelz3LxH_r4/exec", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // 🔥 Handle Menu Options
  const handleOption = (option: string) => {
    addUserMessage(option);

    if (option === "quote") {
      addBotMessage("Great! What's your name?");
      setStep("quoteName");
    } else if (option === "contact") {
      addBotMessage("Sure! What's your name?");
      setStep("contactName");
    } else if (option === "question") {
      addBotMessage("Type your question below:");
      setStep("questionText");
    }
  };

  // 🔥 Handle Input
  const handleInputSubmit = () => {
    if (!input) return;

    addUserMessage(input);

    switch (step) {
      case "quoteName":
        setLead((prev) => ({ ...prev, name: input }));
        addBotMessage("Thanks! Please provide your contact info.");
        setStep("quoteContact");
        setInput("");
        break;

      case "quoteContact":
        setLead((prev) => ({ ...prev, contact: input }));
        addBotMessage(`Thanks! We'll contact you soon.`);
        sendToGoogleSheets({
          name: lead.name,
          contact: input,
          type: "quote",
        });
        setStep("menu");
        setInput("");
        break;

      case "contactName":
        setLead((prev) => ({ ...prev, name: input }));
        addBotMessage("Please provide your contact info.");
        setStep("contactDetails");
        setInput("");
        break;

      case "contactDetails":
        setLead((prev) => ({ ...prev, contact: input }));
        addBotMessage(`Thanks! We'll contact you soon.`);
        sendToGoogleSheets({
          name: lead.name,
          contact: input,
          type: "contact",
        });
        setStep("menu");
        setInput("");
        break;

      case "questionText":
  setLead((prev) => ({ ...prev, question: input }));

  addBotMessage(
    "Thanks for your question 👍 One of our team members will review it and respond shortly."
  );

  setStep("questionContact");
  break;

      case "questionContact":
        setLead((prev) => ({ ...prev, contact: input }));
        addBotMessage("Thanks! We'll respond soon.");
        sendToGoogleSheets({
          name: lead.name,
          contact: input,
          question: lead.question,
          type: "question",
        });
        setStep("menu");
        setInput("");
        break;

      default:
        setStep("menu");
        setInput("");
        break;
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            padding: 15,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#4f46e5",
                color: "rgb(0, 0, 0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                margin: "0 auto 8px",
              }}
            >
              IK
            </div>
            <strong>iKnowiT Assistant</strong>
          </div>

          {/* Messages */}
          <div
            style={{
              border: "1px solid #cccccc",
              borderRadius: 6,
              padding: 10,
              height: 250,
              overflowY: "auto",
              marginBottom: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "bot" ? "left" : "right",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 20,
                    backgroundColor:
                      msg.sender === "bot" ? "#e0e0e0" : "#4f46e5",
                    color: msg.sender === "bot" ? "#000" : "#fff",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ textAlign: "left" }}>
                <span
                  style={{
                    padding: "8px 12px",
                    borderRadius: 20,
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  typing...
                </span>
              </div>
            )}
          </div>

          {/* Menu */}
          {step === "menu" && (
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={() => handleOption("quote")} style={buttonStyle}>
                Quote
              </button>
              <button
                onClick={() => handleOption("question")}
                style={buttonStyle}
              >
                Question
              </button>
              <button
                onClick={() => handleOption("contact")}
                style={buttonStyle}
              >
                Contact
              </button>
            </div>
          )}

          {/* Input */}
          {step !== "menu" && (
            <div style={{ display: "flex", marginTop: 10 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 20,
                  border: "1px solid #ccc",
                  marginRight: 6,
                }}
              />
              <button onClick={handleInputSubmit} style={buttonStyle}>
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "8px 16px",
  borderRadius: 20,
  border: "none",
  backgroundColor: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
} as const;
