"use client";
import { useState, useRef, useEffect } from "react";
import { Message, sendMessageToAssistant } from "../../services/api-asistente";

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "👨‍🍳 ¡Hola! Soy tu chef asistente\n\n📅 Puedo recomendarte recetas por temporada:\n- ❄️ Invierno: Sopas y guisos\n- 🌸 Primavera: Ensaladas frescas\n- ☀️ Verano: Platos ligeros\n- 🍂 Otoño: Recetas con calabaza\n- 🎄 Navidad: Especiales festivos\n\nEjemplo: 'recetas de invierno' o 'qué hacer con pollo'"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    };

    scrollToBottom();
    
    if (!isLoading) {
      const inputEl = document.querySelector("input");
      inputEl?.focus();
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const assistantMessage = await sendMessageToAssistant(messages, trimmedInput);
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "⚠️ Lo siento, ocurrió un error. Por favor intenta de nuevo." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const messageStyles = {
    user: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium",
    assistant: "bg-neutral-700/90 border border-amber-500/20",
    loading: "bg-neutral-700/50 border border-amber-500/10"
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-neutral-900 to-neutral-950">
      <section className="container mx-auto px-4">
        <section className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
            Chef Asistente
          </h1>
          <p className="text-amber-200/80">
            Descubre recetas perfectas para cada temporada
          </p>
        </section>

        <section className="max-w-3xl mx-auto bg-neutral-800/50 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
          <section 
            ref={chatContainerRef}
            className="h-[28rem] p-4 overflow-y-auto"
          >
            {messages.map((message, index) => (
              <section 
                key={index} 
                className={`flex mb-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <section className={`max-w-[90%] rounded-xl px-4 py-3 ${message.role === "user" 
                  ? messageStyles.user
                  : messageStyles.assistant}`}
                >
                  {message.role === "assistant" ? (
                    <section className="whitespace-pre-wrap">
                      {message.content.split('\n').map((line: string, i: number) => (
                        <p 
                          key={i} 
                          className={`${i === 0 ? 'text-amber-300 font-semibold' : ''} ${
                            line.startsWith('- ') ? 'flex items-baseline' : ''
                          }`}
                        >
                          {line.startsWith('- ') ? (
                            <>
                              <span className="text-amber-400 mr-2">•</span>
                              <span>{line.substring(2)}</span>
                            </>
                          ) : line}
                        </p>
                      ))}
                    </section>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </section>
              </section>
            ))}

            {isLoading && (
              <section className="flex justify-start mb-3">
                <section className={`rounded-xl px-4 py-3 ${messageStyles.loading}`}>
                  <section className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <section 
                        key={i}
                        className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </section>
                </section>
              </section>
            )}
            <section ref={messagesEndRef} />
          </section>

          <section className="p-4 bg-neutral-900/70 border-t border-neutral-700/50">
            <form onSubmit={handleSubmit} className="space-y-2">
              <section className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ej: Recetas vegetarianas para verano..."
                  className="flex-1 px-4 py-3 rounded-lg bg-neutral-800/90 border border-amber-500/30 text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-[6rem]"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Enviar'
                  )}
                </button>
              </section>
              <p className="text-xs text-center text-amber-200/50">
                Ejemplos: &quot;postres navideños&quot;, &quot;recetas con pollo&quot;, &quot;platos de otoño&quot;
              </p>
            </form>
          </section>
        </section>
      </section>
    </main>
  );
}