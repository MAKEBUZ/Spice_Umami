import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, Heart } from 'lucide-react';
import { Recipe } from '../services/api-recipes';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      href={`/receta/${recipe.id}`}
      className="group block h-full"
      aria-label={`Ver receta de ${recipe.title}`}
    >
      <section className="bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-neutral-700 group-hover:border-amber-500">
        <section className="relative h-48 w-full">
          {imageError ? (
            <section className="absolute inset-0 bg-neutral-700 flex items-center justify-center">
              <span className="text-neutral-400 text-sm">Imagen no disponible</span>
            </section>
          ) : (
            <Image
              src={recipe.image || '/placeholder-recipe.jpg'}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={false}
            />
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-2 bg-neutral-900/80 rounded-full backdrop-blur-sm hover:bg-amber-500 transition-colors duration-200"
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart 
              size={18} 
              className={isFavorite ? "fill-amber-500 text-amber-500" : "text-white"} 
            />
          </button>
        </section>
        
        <section className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-amber-400 transition-colors duration-200">
            {recipe.title}
          </h3>
          
          <section className="flex items-center gap-4 mb-4 text-sm text-neutral-400">
            <section className="flex items-center gap-1">
              <Users size={16} className="text-amber-400" />
              <span>{recipe.servings} porciones</span>
            </section>
            <section className="flex items-center gap-1">
              <Clock size={16} className="text-amber-400" />
              <span>{recipe.readyInMinutes} min</span>
            </section>
          </section>
          
          {recipe.extendedIngredients && (
            <section className="mb-4 flex-grow">
              <p className="text-neutral-300 mb-1 text-sm font-medium">
                {recipe.extendedIngredients.length} ingredientes principales:
              </p>
              <ul className="text-neutral-400 text-sm space-y-1">
                {recipe.extendedIngredients.slice(0, 3).map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-400 mr-1">•</span>
                    <span className="line-clamp-1">{ingredient.original}</span>
                  </li>
                ))}
                {recipe.extendedIngredients.length > 3 && (
                  <li className="text-neutral-500 text-xs">
                    +{recipe.extendedIngredients.length - 3} ingredientes más...
                  </li>
                )}
              </ul>
            </section>
          )}
          
          <section className="mt-auto">
            <section className="inline-block w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors duration-300 text-center group-hover:shadow-lg group-hover:-translate-y-0.5">
              Ver Receta
            </section>
          </section>
        </section>
      </section>
    </Link>
  );
};

export { RecipeCard };