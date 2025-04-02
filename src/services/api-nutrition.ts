const API_KEY = 'C0CwLkt7hzFSAwcXdJ65vXgHyeFTGVKvEfhWtvhy';
const BASE_URL = 'https://api.calorieninjas.com/v1';

export interface NutritionItem {
  name: string;
  originalName: string; // Nueva propiedad
  serving_size_g: number;
  calories: number;
  protein_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
}

export interface NutritionResponse {
  items: NutritionItem[];
}

export async function getNutritionInfo(query: string): Promise<NutritionItem[]> {
  try {
    query = query.trim();
    
    if (!query || query.length < 2) {
      throw new Error('La búsqueda debe tener al menos 2 caracteres');
    }

    const cleanedQuery = cleanNutritionQuery(query);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${BASE_URL}/nutrition?query=${encodeURIComponent(cleanedQuery)}`, {
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

    const data: NutritionResponse = await response.json();
    
    if (!data?.items || !Array.isArray(data.items)) {
      throw new Error('Formato de respuesta inesperado');
    }

    return formatNutritionResults(data.items, query);

  } catch (error) {
    console.error('Error en getNutritionInfo:', error);
    
    const fallbackItem = createFallbackNutritionItem(query);
    
    if (error instanceof Error && (
      error.message.includes('Failed to fetch') || 
      error.message.includes('aborted')
    )) {
      console.warn('Usando datos de fallback nutricional');
      return [fallbackItem];
    }
    
    throw error;
  }
}

function cleanNutritionQuery(query: string): string {
  return query
    .substring(0, 1500)
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-\.\,]/g, '')
    .trim();
}

function formatNutritionResults(items: NutritionItem[], originalQuery: string): NutritionItem[] {
  const originalItems = originalQuery.split(',').map(item => item.trim());
  
  return items.map((item, index) => ({
    ...item,
    originalName: originalItems[index] || item.name,
    name: formatFoodName(item.name, originalQuery),
    calories: Math.round(item.calories * 10) / 10,
    protein_g: Math.round(item.protein_g * 10) / 10,
    fat_total_g: Math.round(item.fat_total_g * 10) / 10,
    carbohydrates_total_g: Math.round(item.carbohydrates_total_g * 10) / 10
  }));
}

function formatFoodName(apiName: string, userQuery: string): string {
  const mainItem = userQuery.split(',')[0]
    .replace(/(\d+)\s*(g|mg|kg|oz|lb|tbsp|tsp|cups?|ml|l)\b/gi, '')
    .trim();
  
  return mainItem || apiName;
}

function createFallbackNutritionItem(query: string): NutritionItem {
  return {
    name: "Datos no disponibles",
    originalName: query || "Alimento no reconocido",
    serving_size_g: 100,
    calories: 0,
    protein_g: 0,
    fat_total_g: 0,
    fat_saturated_g: 0,
    carbohydrates_total_g: 0,
    fiber_g: 0,
    sugar_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    cholesterol_mg: 0
  };
}