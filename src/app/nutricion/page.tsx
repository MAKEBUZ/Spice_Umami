"use client"

import { useState, useEffect } from 'react';
import { NutritionCard } from '../../components/NutritionCard';
import { getNutritionInfo, NutritionItem } from '../../services/api-nutrition';

export default function Nutrition() {
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState<NutritionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const popularSuggestions = [
    "100g chicken breast", "1 medium apple", "100g cooked rice",
    "1 large egg", "100g salmon", "1 medium avocado",
    "100g Greek yogurt", "100ml whole milk", "1 slice whole wheat bread",
    "100g spinach", "100g cooked chickpeas"
  ];

  const handleSearch = async (searchQuery: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setError('Enter at least 2 characters to search');
      return;
    }

    setQuery(searchQuery);
    setLoading(true);
    setError('');
    setNutritionData([]);
    
    try {
      const data = await getNutritionInfo(searchQuery);
      
      if (data.length === 0 || data.every(item => item.calories === 0)) {
        throw new Error(`No nutrition data found for "${searchQuery}"`);
      }
      
      setNutritionData(data);
      
      setSearchHistory(prev => {
        const updatedHistory = [
          searchQuery,
          ...prev.filter(item => item.toLowerCase() !== searchQuery.toLowerCase())
        ].slice(0, 5);
        return updatedHistory;
      });
    } catch (err) {
      let errorMessage = 'Error getting nutrition information';
      
      if (err instanceof Error) {
        if (err.message.includes('400')) {
          errorMessage = 'Invalid search format. Example: "100g chicken" or "1 apple"';
        } else if (err.message.includes('No nutrition data')) {
          errorMessage = err.message;
        } else if (err.message.includes('timeout')) {
          errorMessage = 'Search took too long. Try a more specific term.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('nutritionSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('nutritionSearchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <section className="container mx-auto px-4">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Nutrition <span className="text-amber-500">Information</span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Discover nutritional values of foods and plan your meals better
          </p>
        </section>
        
        <section className="max-w-2xl mx-auto mb-12">
          <form onSubmit={(e) => handleSearch(query, e)} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError('');
              }}
              placeholder="Example: 100g chicken, 1 apple, 2 tbsp honey"
              className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors duration-300 disabled:opacity-70"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </form>
          
          {error && (
            <section className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </section>
          )}
        </section>

        {loading ? (
          <section className="text-center py-12">
            <section className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto animate-spin mb-4"></section>
            <p className="text-neutral-300">Analyzing nutrition information...</p>
          </section>
        ) : nutritionData.length > 0 ? (
          <>
            <section className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Results for <span className="text-amber-500">&quot;{query}&quot;</span>
              </h2>
              <p className="text-neutral-400">
                {nutritionData.length} {nutritionData.length === 1 ? 'item found' : 'items found'}
              </p>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nutritionData.map((item, index) => (
                <NutritionCard key={index} item={item} />
              ))}
            </section>
          </>
        ) : (
          query && (
            <section className="text-center py-8 text-neutral-300">
              No nutrition data found for &quot;{query}&quot;
            </section>
          )
        )}

        <section className="mt-12">
          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {searchHistory.length > 0 ? 'Your recent searches' : 'Popular searches'}
            </h2>
            <p className="text-neutral-300 mb-6">
              {searchHistory.length > 0 ? 'Try these again or explore new foods' : 'Get nutrition facts for common foods'}
            </p>
            <section className="flex flex-wrap justify-center gap-3">
              {searchHistory.length > 0 ? (
                searchHistory.map((term, index) => (
                  <button
                    key={`history-${index}`}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-amber-500 hover:text-black text-neutral-300 rounded-full transition-colors duration-300"
                  >
                    {term}
                  </button>
                ))
              ) : null}
              
              {popularSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-amber-500 hover:text-black text-neutral-300 rounded-full transition-colors duration-300"
                >
                  {suggestion}
                </button>
              ))}
            </section>
          </section>

          {searchHistory.length === 0 && (
            <section className="max-w-4xl mx-auto bg-neutral-800 p-6 rounded-lg border border-neutral-700">
              <h3 className="text-xl font-semibold mb-4 text-white">Search Tips</h3>
              <ul className="text-neutral-300 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Use quantities like <span className="font-mono bg-neutral-700 px-2 py-1 rounded">100g chicken</span> or <span className="font-mono bg-neutral-700 px-2 py-1 rounded">1 medium apple</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>Specify preparations like <span className="font-mono bg-neutral-700 px-2 py-1 rounded">cooked rice</span> or <span className="font-mono bg-neutral-700 px-2 py-1 rounded">grilled chicken</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  <span>For multiple items, separate with commas: <span className="font-mono bg-neutral-700 px-2 py-1 rounded">100g rice, 200g chicken</span></span>
                </li>
              </ul>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}