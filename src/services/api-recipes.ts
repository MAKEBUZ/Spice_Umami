const API_KEY = 'CWlNZqEQs49PAhwobfQSwHLnQlPrQvD04CnGxvRp';
const BASE_URL = 'https://api.api-ninjas.com/v1';

export interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
  imageUrl?: string;
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    query = query.trim();
    if (query.length < 2) {
      throw new Error('La búsqueda debe tener al menos 2 caracteres');
    }

    const translatedQuery = translateToEnglish(query);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${BASE_URL}/recipe?query=${encodeURIComponent(translatedQuery)}`, {
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!Array.isArray(result)) {
      throw new Error('Formato de respuesta inesperado');
    }

    return translateRecipesToSpanish(result);

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

function translateToEnglish(spanishTerm: string): string {
  const translations: Record<string, string> = {
    'pollo': 'chicken',
    'carne': 'beef',
    'pescado': 'fish',
    'ensalada': 'salad',
    'sopa': 'soup',
    'pasta': 'pasta',
    'arroz': 'rice',
    'postre': 'dessert',
    'huevo': 'egg'
  };

  return spanishTerm.split(' ')
    .map(word => translations[word.toLowerCase()] || word)
    .join(' ');
}

function translateRecipesToSpanish(recipes: Recipe[]): Recipe[] {
  return recipes.map(recipe => ({
    ...recipe,
    title: translateRecipeTitle(recipe.title),
    instructions: translateInstructions(recipe.instructions),
    imageUrl: recipe.imageUrl || '/placeholder-recipe.jpg'
  }));
}

function translateRecipeTitle(title: string): string {
  const translations: Record<string, string> = {
    'cake': 'pastel',
    'pie': 'pay',
    'salad': 'ensalada',
    'soup': 'sopa',
    'bread': 'pan',
    'cookie': 'galleta',
    'chicken': 'pollo',
    'beef': 'carne',
    'fish': 'pescado'
  };

  return title.split(' ')
    .map(word => {
      const baseWord = word.toLowerCase().replace(/[^a-z]/g, '');
      return translations[baseWord] || word;
    })
    .join(' ');
}

function translateInstructions(instructions: string): string {
  const translations: Record<string, string> = {
    'preheat': 'precalentar',
    'oven': 'horno',
    'bake': 'hornear',
    'mix': 'mezclar',
    'stir': 'revolver',
    'add': 'añadir',
    'chop': 'picar',
    'slice': 'cortar en rodajas',
    'dice': 'cortar en cubos',
    'fry': 'freír',
    'boil': 'hervir',
    'simmer': 'cocinar a fuego lento',
    'whisk': 'batir',
    'knead': 'amasar',
    'grease': 'engrasar',
    'season': 'sazonar',
    'peel': 'pelar',
    'grate': 'rallar',
    'blend': 'licuar',
    'serve': 'servir',
    'until': 'hasta que',
    'minutes': 'minutos',
    'degrees': 'grados'
  };

  return instructions.split('\n')
    .map(line => {
      return line.split(' ')
        .map(word => {
          const baseWord = word.toLowerCase().replace(/[^a-z]/g, '');
          return translations[baseWord] || word;
        })
        .join(' ');
    })
    .join('\n');
}

function getFallbackRecipes(query: string): Recipe[] {
  const fallbackRecipes: Recipe[] = [
    {
      title: "Pastel de Chocolate",
      ingredients: "chocolate|huevos|harina|azúcar|mantequilla",
      servings: "8 porciones",
      instructions: "1. Precalentar el horno a 180°C\n2. Mezclar todos los ingredientes\n3. Hornear por 30 minutos",
      imageUrl: "/placeholder-recipe.jpg"
    },
    {
      title: "Ensalada César",
      ingredients: "lechuga|pollo|crutones|queso parmesano|salsa cesar",
      servings: "4 porciones",
      instructions: "1. Mezclar todos los ingredientes\n2. Añadir la salsa al servir",
      imageUrl: "/placeholder-recipe.jpg"
    }
  ];

  return fallbackRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(query.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(query.toLowerCase())
  );
}

export function parseIngredients(ingredients: string): string[] {
  return ingredients.split('|')
    .map(ing => ing.trim())
    .filter(ing => ing.length > 0);
}