"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Recipe, getRecipeDetails } from '../../../services/api-recipes';
import { useRouter } from 'next/navigation';

export default function RecipePage({ params }: { params: { slug: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeId = Number(params.slug);
        if (!Number.isInteger(recipeId)) {
          throw new Error('ID de receta inválido');
        }
        
        const recipeData = await getRecipeDetails(recipeId);
        
        // Verificar si la receta existe
        if (!recipeData || !recipeData.id) {
          throw new Error('Receta no encontrada');
        }
        
        setRecipe(recipeData);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la receta');
        console.error(err);
        
        // Redirigir a la página de búsqueda después de 3 segundos
        setTimeout(() => {
          router.push('/busca-recetas');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.slug, router]);

  // Función para parsear instrucciones más robusta
  const parseInstructions = () => {
    if (!recipe) return [];
    
    // Priorizar analyzedInstructions si está disponible
    if (recipe.analyzedInstructions?.[0]?.steps) {
      return recipe.analyzedInstructions[0].steps.map(step => step.step);
    }
    
    // Parsear instructions si existe
    if (recipe.instructions) {
      return recipe.instructions
        .replace(/<\/?ol>|<\/?li>|<\/?ul>/g, "\n")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .split('\n')
        .filter(step => step.trim());
    }
    
    return ['No hay instrucciones disponibles'];
  };

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
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-neutral-300">Redirigiendo a la página de búsqueda...</p>
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

  const instructions = parseInstructions();

  return (
    <main className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <section className="container mx-auto px-4">
        <section className="mb-8">
          <Link href="/busca-recetas" className="text-amber-500 hover:text-amber-400">
            ← Volver a recetas
          </Link>
        </section>
        
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ... (resto del JSX permanece igual) ... */}
        </section>
      </section>
    </main>
  );
}