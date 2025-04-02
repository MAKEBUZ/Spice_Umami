import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '../services/api-recipes';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link 
      href={`/receta/${recipe.id}`}
      className="group block h-full"
      prefetch={false}
    >
      <div className="bg-neutral-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-neutral-700 group-hover:border-amber-500">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image || '/placeholder-recipe.jpg'}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-amber-400 transition-colors duration-200">
            {recipe.title}
          </h3>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-neutral-400">
            <div className="flex items-center gap-1">
              <Users size={16} className="text-amber-400" />
              <span>{recipe.servings} porciones</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-amber-400" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="inline-block w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors duration-300 text-center">
              Ver Receta
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}