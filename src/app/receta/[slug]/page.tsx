"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe, getRecipeDetails } from '../../../services/api-recipes';
import Image from 'next/image';
import { Clock, Users, BookOpen } from 'lucide-react';

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const recipeId = parseInt(slug);
        if (isNaN(recipeId)) {
          throw new Error('ID de receta inválido');
        }

        const data = await getRecipeDetails(recipeId);
        if (!data) {
          throw new Error('Receta no encontrada');
        }
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la receta');
        setTimeout(() => router.push('/busca-recetas'), 3000);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [slug, router]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-900">
        <section className="text-center">
          <section className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></section>
          <p className="mt-4 text-neutral-300">Cargando receta...</p>
        </section>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-900">
        <section className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <p className="text-neutral-300">Redirigiendo a la página de búsqueda...</p>
        </section>
      </section>
    );
  }

  if (!recipe) {
    return null;
  }

  const getInstructions = () => {
    if (recipe.analyzedInstructions?.[0]?.steps?.length) {
      return recipe.analyzedInstructions[0].steps.map(step => step.step);
    }
    
    if (recipe.instructions) {
      return recipe.instructions
        .replace(/<\/?[^>]+(>|$)/g, "\n")
        .split('\n')
        .filter(step => step.trim());
    }
    
    return ['No hay instrucciones disponibles'];
  };

  const instructions = getInstructions();

  return (
    <main className="min-h-screen bg-neutral-900 text-white pt-12 pb-16">
      <section className="container mx-auto px-4">

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            
            <section className="flex items-center gap-6 mb-6 text-neutral-300">
              <section className="flex items-center gap-2">
                <Users size={20} />
                <span>{recipe.servings} porciones</span>
              </section>
              <section className="flex items-center gap-2">
                <Clock size={20} />
                <span>{recipe.readyInMinutes} minutos</span>
              </section>
            </section>

            <section className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={recipe.image || '/placeholder-recipe.jpg'}
                alt={`Imagen de ${recipe.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </section>

            <section className="bg-neutral-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BookOpen size={20} />
                Instrucciones
              </h2>
              <ol className="space-y-4 list-decimal list-inside">
                {instructions.map((step, index) => (
                  <li key={index} className="text-neutral-300">
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </section>

          <section className="lg:sticky lg:top-4">
            <section className="bg-neutral-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Ingredientes</h2>
              <ul className="space-y-3">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-start gap-3">
                    <span className="w-6 h-6 flex-shrink-0 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center text-sm">
                      •
                    </span>
                    <span className="text-neutral-300">{ingredient.original}</span>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}