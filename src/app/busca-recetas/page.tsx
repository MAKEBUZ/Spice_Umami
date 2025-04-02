"use client";

import { useState } from 'react';
import { RecipeCard } from '../../components/RecipeCard';
import { Recipe, searchRecipes } from '../../services/api-recipes';

export default function SearchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError('Error al buscar recetas. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <section className="container mx-auto px-4">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Buscar <span className="text-amber-500">Recetas</span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Descubre deliciosas recetas para cualquier ocasión
          </p>
        </section>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <section className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar recetas..."
              className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors duration-300 disabled:opacity-70"
              disabled={loading || !query.trim()}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </section>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </form>

        {loading ? (
          <section className="text-center py-12">
            <section className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto animate-spin"></section>
            <p className="mt-4 text-neutral-300">Buscando recetas...</p>
          </section>
        ) : recipes.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        ) : (
          query && (
            <section className="text-center py-12 text-neutral-300">
              No se encontraron recetas para &quot;{query}&quot;
            </section>
          )
        )}
      </section>
    </main>
  );
}