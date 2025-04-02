'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
  initialValue?: string;
}

const SearchBar = ({ onSearch, placeholder, initialValue = '' }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      router.push(`/busca-recetas?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsTyping(true);
          }}
          onBlur={() => setIsTyping(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 ${
            isTyping ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'
          } text-black font-medium rounded-md transition-colors duration-300`}
          aria-label="Buscar recetas"
        >
          {isTyping ? 'Buscar ahora' : 'Buscar'}
        </button>
      </div>
    </form>
  );
};

export { SearchBar };