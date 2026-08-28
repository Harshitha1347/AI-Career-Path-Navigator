'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 'msg-001',
    role: 'ai',
    text: "Hey Arjun! 👋 You're on a 47-day streak — incredible consistency. Today's priority is Self-Attention implementation. Want me to walk you through the math before you code it?",
    time: 'Just now',
  },
];

export default function AIMentorFab() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = [
    'Great question! Multi-head attention allows the model to attend to information from different representation subspaces. Each head learns different aspects of the relationships between tokens.',
    "For your PyTorch implementation, start with a single attention head, validate it, then scale to multi-head. Here's the key formula: Attention(Q,K,V) = softmax(QK^T / √d_k)V",
    "You're making excellent progress! Your MLOps score is your biggest gap right now — I'd recommend spending 30 minutes tomorrow on Docker basics for ML workflows.",
    "Based on your current pace, you'll be job-ready in approximately 74 days. Companies like Google, OpenAI, and Cohere are actively hiring ML Engineers with your skill profile.",
  ];

  // Backend integration point: POST /api/ai/mentor/chat
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      text: input,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));
    const aiMsg: Message = {
      id: `msg-ai-${Date.now()}`,
      role: 'ai',
      text: aiResponses[messages.length % aiResponses.length],
      time: 'Just now',
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 max-h-[520px] glass-card border border-primary/30 rounded-2xl shadow-2xl flex flex-col z-50 animate-scale-in neon-glow-violet">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                }}
              >
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">AI Mentor</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs text-neon-green">Online · GPT-4o</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close AI Mentor chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'ai' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    }}
                  >
                    <Sparkles size={12} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'text-white rounded-tr-sm'
                      : 'glass-card text-foreground rounded-tl-sm'
                  }`}
                  style={
                    msg.role === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                        }
                      : undefined
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                  }}
                >
                  <Sparkles size={12} className="text-white" />
                </div>
                <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`dot-${i}`}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2 glass-card rounded-xl px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything about your roadmap..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder-muted-foreground"
                aria-label="Message AI Mentor"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                }}
                aria-label="Send message"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              AI Mentor remembers your full roadmap context
            </p>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-200 active:scale-90 z-50 mentor-bubble animate-glow-pulse"
        aria-label={open ? 'Close AI Mentor' : 'Open AI Mentor chat'}
      >
        {open ? <Minimize2 size={22} /> : <MessageSquare size={22} />}
      </button>
    </>
  );
}
