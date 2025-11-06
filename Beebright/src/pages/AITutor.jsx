import React, { useState } from "react";

// 🔹 Gemini API call function
const generateContentWithGemini = async (prompt) => {
  const API_KEY = "AIzaSyAc0zAAYFOotLS-3CW4bwffeWD224lHkl0"; // ⚠️ Replace with your secure key (move to .env for production)
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected API response:", data);
      throw new Error("Unexpected response format from Gemini API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// 🔹 Main AI Tutor component
export default function AITutor() {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]); // Chat history

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: aiQuery }];
    setMessages(newMessages);
    setAiQuery("");
    setIsLoading(true);

    try {
      const response = await generateContentWithGemini(aiQuery);
      setMessages([
        ...newMessages,
        { sender: "ai", text: response || "🤖 Sorry, I couldn't generate a response." },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          sender: "ai",
          text: `⚠️ I'm having trouble connecting right now. Please try again later.\n\nError: ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] bg-white rounded-2xl border border-indigo-100 shadow-sm p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">💬 AI Tutor</h1>
      <p className="text-gray-500 mb-6">
        Ask anything related to your studies — your AI tutor is here to help! 🚀
      </p>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center italic">
            Start by asking your AI tutor a question!
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-500 text-sm italic animate-pulse">
            Tutor is thinking...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleAiSubmit} className="flex gap-2">
        <input
          type="text"
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            isLoading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
