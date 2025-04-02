const API_KEY = 'xRmJ2Nu7Zf3cL5ado2RyGAXVBsYRB7YR';
const BASE_URL = 'https://api.apilayer.com/spoonacular';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings?: number;
  readyInMinutes?: number;
  sourceUrl?: string;
  summary?: string;
  analyzedInstructions?: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
      equipment: {
        id: number;
        name: string;
        localizedName: string;
        image: string;
      }[];
    }[];
  }[];
  extendedIngredients?: {
    id: number;
    name: string;
    original: string;
    amount: number;
    unit: string;
  }[];
  instructions?: string;
  diets?: string[];
  dishTypes?: string[];
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    query = query.trim();
    if (query.length < 2) {
      throw new Error('La búsqueda debe tener al menos 2 caracteres');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&addRecipeInformation=true`,
      {
        headers: {
          'apikey': API_KEY,
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.results || !Array.isArray(result.results)) {
      throw new Error('Formato de respuesta inesperado');
    }

    return result.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      imageType: recipe.imageType,
      servings: recipe.servings,
      readyInMinutes: recipe.readyInMinutes,
      summary: recipe.summary,
      instructions: recipe.instructions,
      extendedIngredients: recipe.extendedIngredients
    }));

  } catch (error) {
    console.error('Error en searchRecipes:', error);
    
    const fallbackRecipes = getFallbackRecipes(query);
    
    if (error instanceof Error && (
      error.message.includes('Failed to fetch') || 
      error.message.includes('aborted')
    )) {
      console.warn('Usando datos de fallback');
      return fallbackRecipes;
    }
    
    throw error;
  }
}

export async function getRecipeDetails(id: number): Promise<Recipe> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?includeNutrition=false`,
      {
        headers: {
          'apikey': API_KEY,
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const recipe = await response.json();
    
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      servings: recipe.servings,
      readyInMinutes: recipe.readyInMinutes,
      sourceUrl: recipe.sourceUrl,
      summary: recipe.summary,
      instructions: recipe.instructions,
      analyzedInstructions: recipe.analyzedInstructions,
      extendedIngredients: recipe.extendedIngredients,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes
    };

  } catch (error) {
    console.error('Error en getRecipeDetails:', error);
    throw error;
  }
}

function getFallbackRecipes(query: string): Recipe[] {
  const fallbackRecipes: Recipe[] = [
    {
      id: 1,
      title: "Pastel de Chocolate",
      image: "/placeholder-recipe.jpg",
      servings: 8,
      readyInMinutes: 45
    },
    {
      id: 2,
      title: "Ensalada César",
      image: "/placeholder-recipe.jpg",
      servings: 4,
      readyInMinutes: 20
    }
  ];

  return fallbackRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );
}

export function parseIngredients(ingredients: any[]): string[] {
  return ingredients.map(ing => ing.original);
}