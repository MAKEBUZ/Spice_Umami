const API_KEY = 'xRmJ2Nu7Zf3cL5ado2RyGAXVBsYRB7YR';
const BASE_URL = 'https://api.apilayer.com/spoonacular';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  summary: string;
  instructions: string;
  analyzedInstructions?: {
    steps: {
      step: string;
    }[];
  }[];
  extendedIngredients: {
    id: number;
    original: string;
  }[];
}

export async function getRecipeDetails(id: number): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes/${id}/information`, {
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 3600 } // Cache por 1 hora
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    title: data.title,
    image: data.image,
    servings: data.servings,
    readyInMinutes: data.readyInMinutes,
    summary: data.summary,
    instructions: data.instructions || '',
    analyzedInstructions: data.analyzedInstructions || [],
    extendedIngredients: data.extendedIngredients || []
  };
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await fetch(
    `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&addRecipeInformation=true`,
    {
      headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return data.results.map((item: {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    summary: string;
    instructions?: string;
    analyzedInstructions?: {
      steps: {
        step: string;
      }[];
    }[];
    extendedIngredients?: {
      id: number;
      original: string;
    }[];
  }) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    servings: item.servings,
    readyInMinutes: item.readyInMinutes,
    summary: item.summary,
    instructions: item.instructions || '',
    analyzedInstructions: item.analyzedInstructions || [],
    extendedIngredients: item.extendedIngredients || []
  }));
}