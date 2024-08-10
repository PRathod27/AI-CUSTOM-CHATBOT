"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Assistant = () => {
  const [messages, setMessages] = useState<
    { id: number; content: string; role: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const newMessage = { id: Date.now(), content: input, role: "user" };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });
      if (response.ok) {
        const result = await response.text();
        const botMessage = {
          id: Date.now() + 1,
          content: result,
          role: "assistant",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error("Error fetching response:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event) // Pass the event object as an argument
    }
  }

  return (
    <main className="h-100% w-full flex flex-col bg-muted">
      <div className="container h-full w-full flex flex-col py-8">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`w-8 h-8 ${
                  message.role === "assistant" ? "bg-blue-500" : "bg-green-500"
                } rounded-full mr-4 ` }
              ></div>
              <div
                className={`p-4 rounded-lg ${
                  message.role === "assistant" ? "bg-blue-100" : "bg-green-100"
                } max-w-[60%] break-words`}
              >
                <p className="text-lg">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 relative">
          <Textarea
            className="w-full text-lg"
            placeholder="Say something"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            type="submit"
            className="absolute top-1 transform translate-y-1/2 right-4 rounded-full"
            size="icon"
            disabled={!input}
          >
            <Send size={24} />
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Assistant;
