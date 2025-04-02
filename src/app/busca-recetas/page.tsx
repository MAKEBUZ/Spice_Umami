"use client"

import { useState, useEffect } from 'react';
import { RecipeCard } from '../../components/RecipeCard';
import { Recipe, searchRecipes } from '../../services/api-recipes';

export default function SearchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const popularSuggestions = [
    "pasta", "chicken", "salad", "dessert", "vegetarian",
    "quick meals", "high protein", "low carb", "mediterranean"
  ];

  const handleSearch = async (searchQuery: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setLoading(true);
    setError('');
    
    try {
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
      
      setSearchHistory(prev => {
        const updatedHistory = [
          searchQuery,
          ...prev.filter(item => item.toLowerCase() !== searchQuery.toLowerCase())
        ].slice(0, 5);
        return updatedHistory;
      });
    } catch {
      setError('Error de conexión. Mostrando recetas de ejemplo...');
      setRecipes(getFallbackRecipes());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('recipeSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    const searchParams = new URLSearchParams(window.location.search);
    const initialQuery = searchParams.get('q') || '';
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, []);

  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('recipeSearchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <section className="container mx-auto px-4">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Search <span className="text-amber-500">Recipes</span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Discover delicious recipes for any occasion
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
              placeholder="Search by recipe name or ingredients (e.g., chicken, pasta, salad)..."
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
          <section className="text-center py-8">
            <section className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto animate-spin"></section>
            <p className="mt-4 text-neutral-300">Searching recipes...</p>
          </section>
        ) : error ? (
          <section className="text-center">
            <section className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg max-w-md mx-auto mb-6">
              {error}
            </section>
            {recipes.length > 0 && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </section>
            )}
          </section>
        ) : recipes.length > 0 ? (
          <>
            <section className="mb-6 text-neutral-300">
              {recipes.length} recipes found for &quot;{query}&quot;
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </section>
          </>
        ) : (
          query && (
            <section className="text-center py-8 text-neutral-300">
              No recipes found for &quot;{query}&quot;
            </section>
          )
        )}

        <section className="mt-12">
          <section className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {searchHistory.length > 0 ? 'Your recent searches' : 'Popular searches'}
            </h2>
            <p className="text-neutral-300 mb-6">
              {searchHistory.length > 0 ? 'Try these again or explore new ideas' : 'Discover delicious recipes'}
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
        </section>
      </section>
    </main>
  );
}

function getFallbackRecipes(): Recipe[] {
  return [];
}
