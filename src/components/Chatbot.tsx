import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useIsMobile } from "./ui/use-mobile";
import { getAnimationConfig } from "../lib/animations";
import { suggestedQuestions } from "./constants";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Jack's AI assistant. Ask me anything about his experience, skills, or projects!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);

  useEffect(() => {
    const scrollContainer = document.getElementById("chat-messages");
    if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, text: "", sender: "bot", timestamp: new Date() },
    ]);

    setIsTyping(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        body: JSON.stringify({ query: input }),
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // append chunk immediately to bot message
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: msg.text + chunk } : msg
            )
          );
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: "Error fetching response." }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 pb-32 relative bg-black">
      <div className="max-w-4xl mx-auto relative z-10 w-full h-[calc(100vh-10rem)]">
        {/* Header */}
        <motion.div
          initial={anim.fadeInUp.initial}
          animate={anim.fadeInUp.animate}
          transition={anim.fadeInUp.transition}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl mb-4 relative inline-block">
            <span className="relative text-white">
              Ask Me Anything
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </span>
          </h2>
          <p className="text-gray-400 mt-6 text-xs md:text-base px-4">
            Chat with an AI trained on Jack's resume and experience • Rate limited to 5 requests/hour
          </p>
        </motion.div>

        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: isMobile ? 0 : 0.2,
            duration: isMobile ? 0.3 : 0.8,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-lg flex flex-col h-full"
        >
          <div id="chat-messages" className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3 md:gap-4 items-start">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.sender === "bot" ? "bg-red-500/20 text-red-400" : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {msg.sender === "bot" ? <Bot className="w-4 h-4 md:w-5 md:h-5" /> : <User className="w-4 h-4 md:w-5 md:h-5" />}
                </div>
                <div className="flex-1 space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-white">{msg.sender === "bot" ? "Jack's AI" : "You"}</span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {msg.text}
                    {isTyping && msg.sender === "bot" && <span className="animate-pulse">|</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-3 md:p-4">
            <div className="flex gap-2 md:gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Jack's experience, skills, or projects..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1 text-sm md:text-base"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
