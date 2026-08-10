import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, Database, Layers } from 'lucide-react';
import { ChatMessage, Recipe } from '../types';
import { apiChatWithChef } from '../lib/geminiService';

interface AIChefChatProps {
  currentRecipe?: Recipe;
}

export const AIChefChat: React.FC<AIChefChatProps> = ({ currentRecipe }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_1',
      sender: 'chef',
      text: "Hello! I'm your KitchenIQ AI Master Chef. Ask me anything about vegetarian recipes, substitutions, cooking techniques, or instant meal ideas!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const presetQuestions = [
    'What can I make with paneer and spinach?',
    "I don't have butter. What can I use?",
    'Make this recipe vegan.',
    'High-protein breakfast ideas with eggs'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await apiChatWithChef(textToSend, currentRecipe);
      const chefMsg: ChatMessage = {
        id: `chef_${Date.now()}`,
        sender: 'chef',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragContext: res.ragContext
      };
      setMessages((prev) => [...prev, chefMsg]);
    } catch (e) {
      console.error('Chat error', e);
      setMessages((prev) => [
        ...prev,
        {
          id: `chef_err_${Date.now()}`,
          sender: 'chef',
          text: 'For dairy-free or vegan options, try swapping butter for olive oil or paneer for firm tofu!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#131B2A] border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[520px] shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-[#0B0F19]/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
              Ask KitchenIQ AI Chef
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-widest border border-emerald-500/30 rounded-full">
                RAG Engine
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Powered by Gemini LLM & Culinary Knowledge Base
            </p>
          </div>
        </div>

        {currentRecipe && (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 max-w-[180px] truncate">
            {currentRecipe.name}
          </span>
        )}
      </div>

      {/* Messages Feed */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs bg-[#0D111A]/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl space-y-2 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold'
                  : 'bg-[#162032] border border-slate-700/80 text-slate-200'
              }`}
            >
              <p>{msg.text}</p>

              {/* RAG Context Citation Box */}
              {msg.ragContext && (
                <div className="pt-2 border-t border-slate-700/60 text-[10px] text-emerald-300 space-y-1">
                  <div className="flex items-center space-x-1 font-bold uppercase tracking-wider">
                    <Database className="w-3 h-3 text-emerald-400" />
                    <span>RAG Knowledge Sources ({msg.ragContext.recipesUsed.length})</span>
                  </div>
                  <p className="text-slate-400 text-[9.5px]">
                    {msg.ragContext.reasoning}
                  </p>
                </div>
              )}
            </div>

            <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>AI Chef is contemplating with RAG context...</span>
          </div>
        )}
      </div>

      {/* Preset Quick Questions */}
      <div className="px-4 py-2 bg-[#0B0F19]/40 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 bg-[#162032] hover:bg-slate-800 text-[10.5px] text-slate-300 font-medium rounded-xl whitespace-nowrap transition border border-slate-700/60 shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-800 bg-[#0B0F19]/60 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask AI Chef about ingredients, substitutes, or tips..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2.5 bg-[#162032] border border-slate-700/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || isLoading}
          className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold disabled:opacity-40 transition rounded-xl"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
