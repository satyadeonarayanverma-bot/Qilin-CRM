"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function AICopilot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: "Hello! I'm Qilin AI. How can I help you manage your leads today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user' as const, content: input }];
        setMessages(newMessages);
        setInput("");

        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm currently in demo mode. Once connected to the Groq API, I can summarize leads, draft emails, and provide insights!" }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-80 md:w-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mb-4 overflow-hidden flex flex-col glass-dark h-[500px]"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="font-semibold text-white">Qilin Copilot</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white/50 hover:text-white" onClick={() => setIsOpen(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                        msg.role === 'user'
                                            ? "bg-indigo-600 text-white rounded-tr-none"
                                            : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-white/10 bg-black/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Ask Qilin..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-1 top-1 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition"
                                >
                                    <Send className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-tr from-indigo-500 to-purple-600 animate-float"
                )}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-8 h-8 text-white" />}
            </motion.button>
        </div>
    );
}
