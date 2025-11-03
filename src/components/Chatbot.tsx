import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from './ui/use-mobile';
import { getAnimationConfig } from '../lib/animations';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Jack's AI assistant. Ask me anything about his experience, skills, or projects!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useIsMobile();
  const anim = getAnimationConfig(isMobile);

  useEffect(() => {
    const scrollContainer = document.getElementById('chat-messages');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (query: string): string => {
    if (query.includes('scotiabank') || query.includes('experience') || query.includes('work')) {
      return "Jack currently works at Scotiabank as a Software Developer, where he's developed large-scale banking applications with focus on security and performance. He reduced API response time by 45% and implemented automated testing pipelines that reduced bugs by 60%.";
    }
    if (query.includes('education') || query.includes('school') || query.includes('university') || query.includes('degree')) {
      return "Jack graduated from University of Toronto in 2024 with a Bachelor of Computer Science. During his time there, he also worked as a Research Assistant on ML applications in NLP and co-authored a paper on sentiment analysis published in IEEE.";
    }
    if (query.includes('skills') || query.includes('tech') || query.includes('stack') || query.includes('language')) {
      return "Jack's tech stack includes TypeScript, Python, React, Next.js, Node.js, PostgreSQL, MongoDB, and more. He's experienced in both frontend and backend development, with expertise in building scalable APIs, real-time systems, and modern web applications.";
    }
    if (query.includes('project')) {
      return "Jack has built several impressive projects including an API Gateway System with Node.js and Redis, a Real-Time Analytics Dashboard processing 100k+ events/minute, an AI Code Review Assistant using GPT-4, and a Blockchain Event Tracker for monitoring on-chain events.";
    }
    if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire')) {
      return "You can reach Jack at jack@jackbranston.com or connect with him on LinkedIn and GitHub. Feel free to book a coffee chat using the contact section to schedule a 30-minute video call!";
    }
    if (query.includes('api') || query.includes('gateway')) {
      return "The API Gateway System is one of Jack's flagship projects. Built with Node.js, Redis, and Docker, it handles authentication, rate limiting, and routing across 15+ microservices. It features JWT authentication and comprehensive Swagger documentation.";
    }
    if (query.includes('analytics') || query.includes('dashboard')) {
      return "The Real-Time Analytics Dashboard is an impressive project that processes over 100,000 events per minute using WebSockets and React. It features optimized rendering with React.memo, virtual scrolling, and custom D3.js visualizations for time-series data.";
    }
    return "I'm trained on Jack's resume and experience. You can ask me about his work at Scotiabank, his education at University of Toronto, his technical skills, his projects, or how to contact him. What would you like to know?";
  };

  const suggestedQuestions = [
    "Tell me about Jack's experience at Scotiabank",
    "What projects has Jack built?",
    "What are Jack's technical skills?",
    "How can I contact Jack?",
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 pb-32 relative bg-black">
      <div className="max-w-4xl mx-auto relative z-10 w-full h-[calc(100vh-10rem)]">
        <motion.div
          {...anim.fadeInUp}
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

        <motion.div
          initial={{ opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: isMobile ? 0 : 0.2,
            duration: isMobile ? 0.3 : 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-lg flex flex-col h-full"
        >
          {/* Messages */}
          <div id="chat-messages" className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="space-y-4 md:space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: isMobile ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: isMobile ? 0.2 : 0.4,
                    delay: isMobile ? 0 : index * 0.05,
                  }}
                  className="flex gap-3 md:gap-4 items-start"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1 md:space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm text-white">
                        {message.sender === 'bot' ? "Jack's AI" : 'You'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 md:gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                    <Bot className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-xs md:text-sm text-white">Jack's AI</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && (
                <div className="space-y-3 mt-4">
                  <p className="text-xs md:text-sm text-gray-500">Suggested questions:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: isMobile ? 1 : 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: isMobile ? 0 : i * 0.1,
                          duration: isMobile ? 0.2 : 0.3,
                        }}
                        onClick={() => {
                          setInput(question);
                        }}
                        className="text-left text-xs md:text-sm p-2 md:p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-red-500/50 hover:bg-gray-800 transition-all duration-200 text-gray-400"
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-800 p-3 md:p-4">
            <div className="flex gap-2 md:gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Jack's experience, skills, or projects..."
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1 text-sm md:text-base"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
