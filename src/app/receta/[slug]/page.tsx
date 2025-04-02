"use client"

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Recipe, searchRecipes } from '../../../services/api-recipes';
import Image from 'next/image';
import { Clock, Users, BookOpen } from 'lucide-react';

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Correctamente desestructuramos el Promise usando React.use()
  const { slug } = use(params);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const decodedTitle = decodeURIComponent(slug);
        const recipes = await searchRecipes(decodedTitle);
        if (recipes.length > 0) {
          setRecipe(recipes[0]);
        } else {
          setError('Receta no encontrada');
        }
      } catch (err) {
        setError('Error al cargar la receta');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen pt-24 pb-16 bg-neutral-900 text-center">
        <section className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto animate-spin"></section>
        <p className="mt-4 text-neutral-300">Cargando receta...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen pt-24 pb-16 bg-neutral-900 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!recipe) {
    return (
      <section className="min-h-screen pt-24 pb-16 bg-neutral-900 text-center">
        <p className="text-neutral-300">Receta no encontrada</p>
      </section>
    );
  }

  const ingredients = recipe.ingredients.split('|').map(ing => ing.trim());
  const instructions = recipe.instructions.split('\n')
    .filter(step => step.trim())
    .map(step => step.replace(/^\d+\.\s*/, '').trim());

  return (
    <main className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <section className="container mx-auto px-4">
        <section className="mb-8">
          <Link href="/busca-recetas" className="text-amber-500 hover:text-amber-400">
            ← Volver a recetas
          </Link>
        </section>
        
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{recipe.title}</h1>
            
            <section className="flex items-center gap-6 mb-6 text-neutral-300">
              <section className="flex items-center gap-2">
                <Users size={20} />
                <span>{recipe.servings}</span>
              </section>
              <section className="flex items-center gap-2">
                <Clock size={20} />
                <span>30 min</span>
              </section>
            </section>
            
            <section className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src="/placeholder-recipe.jpg"
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </section>
            
            <section className="bg-neutral-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                <BookOpen size={20} />
                Instrucciones
              </h2>
              <ol className="space-y-4">
                {instructions.map((step, index) => (
                  <li key={index} className="recipe-step">

                    <p className="text-neutral-300">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </section>
          
          <section>
            <section className="bg-neutral-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-2xl font-semibold mb-6 text-white">Ingredientes</h2>
              <ul className="space-y-3 text-neutral-300">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 flex-shrink-0 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              <section className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-white">Información Nutricional</h3>
                <p className="text-neutral-300 mb-4">
                  Consulta el valor nutricional de esta receta por porción.
                </p>
                <Link 
                  href={`/nutricion?query=${encodeURIComponent(recipe.title)}`}
                  className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors duration-300"
                >
                  Ver Nutrición
                </Link>
              </section>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}