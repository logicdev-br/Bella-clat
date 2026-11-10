import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { useEclat } from '../context/EclatContext';
import { askBotanicalAI } from '../services/apiServices';

export default function BotanicalAIChatWidget() {
  const { skinPlan } = useEclat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Bonjour! Sou a Dra. Camille Laurent (IA), Facialista Sênior da Maison Belle Éclat. Como posso ajudar sua pele hoje?',
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);

    const res = await askBotanicalAI({
      skinPlan,
      userQuestion: text,
    });

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        text: res.text,
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="w-[350px] sm:w-[390px] h-[480px] rounded-[12px] bg-[#FAF8F5] border border-[#C5A880] flex flex-col overflow-hidden shadow-xl">
          {/* Topo do Chat */}
          <div className="px-5 py-4 bg-[#2F3E2E] text-[#FAF8F5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-[19px] leading-none text-[#FAF8F5]">
                  Dra. Camille Laurent (IA)
                </h3>
                <span className="text-[10px] uppercase tracking-[0.08em] text-[#C5A880] block mt-1">
                  ✦ Gemini AI • Concierge Botânica
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#FAF8F5]/80 hover:text-[#FAF8F5]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#EFECE6]/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-[10px] text-[13px] leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#2F3E2E] text-[#FAF8F5] rounded-br-none'
                      : 'bg-[#FFFFFF] text-[#1E241E] border border-[#E2DEC9] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-[10px] bg-[#FFFFFF] border border-[#E2DEC9] text-[12px] text-[#5C645A] flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2F3E2E]" />
                  <span>Dra. Camille está analisando...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Campo de Digitação */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#FAF8F5] border-t border-[#E2DEC9] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem para a IA..."
              className="flex-1 px-3.5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E2DEC9] text-[13px] text-[#1E241E] focus:outline-none focus:border-[#C5A880]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-[#2F3E2E] text-[#FAF8F5] flex items-center justify-center hover:bg-[#7C8C76] disabled:opacity-50 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-5 py-3.5 rounded-full bg-[#2F3E2E] text-[#FAF8F5] border border-[#C5A880] flex items-center gap-2.5 hover:bg-[#7C8C76] transition-all duration-250 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span className="font-serif text-[18px] tracking-wide">
            Falar com Dra. Camille (IA)
          </span>
        </button>
      )}
    </div>
  );
}
