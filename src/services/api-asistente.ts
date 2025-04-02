export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const sendMessageToAssistant = async (
  messages: Message[],
  userInput: string
): Promise<Message> => {
  const API_KEY = "36qU1S198SKHm1vUflccd3W3u6MiH9LN";
  const API_URL = "https://api.mistral.ai/v1/chat/completions";

  const seasons = [
    { emoji: '❄️', name: 'Invierno', months: [12, 1, 2], keywords: ['invierno', 'frío'] },
    { emoji: '🌸', name: 'Primavera', months: [3, 4, 5], keywords: ['primavera'] },
    { emoji: '☀️', name: 'Verano', months: [6, 7, 8], keywords: ['verano', 'calor'] },
    { emoji: '🍂', name: 'Otoño', months: [9, 10, 11], keywords: ['otoño', 'otono'] },
    { emoji: '🎄', name: 'Navidad', months: [12], keywords: ['navidad', 'festivo'] }
  ];

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    const season = seasons.find(s => s.months.includes(month)) || seasons[1];
    return `${season.emoji}${season.name}`;
  };

  const detectSeason = (input: string) => {
    const lowerInput = input.toLowerCase();
    const foundSeason = seasons.find(season => 
      season.keywords.some(keyword => lowerInput.includes(keyword))
    );
    return foundSeason ? `${foundSeason.emoji}${foundSeason.name}` : getCurrentSeason();
  };
  const generateFallbackRecipes = (season: string) => {
    const categories = ['Sopas', 'Plato fuerte', 'Ensaladas', 'Postres', 'Aperitivos'];
    const names = [
      'Ajiaco', 'Bandeja paisa', 'Sancocho', 'Lechona', 'Tamal',
      'Ceviche', 'Empanadas', 'Arepa', 'Hormigas', 'Postre de natas'
    ];
    
    return Array.from({ length: 10 }, (_, i) => {
      const name = names[i % names.length];
      const category = categories[i % categories.length];
      const difficulty = '⭐'.repeat((i % 3) + 1);
      return `- ${name} (${category}) ${season} ${difficulty}`;
    }).join('\n');
  };

  const formatResponse = (content: string, requestedSeason: string): string => {
    const recipeLines = content.split('\n')
      .filter(line => line.match(/^- .+ \(.+\) [❄️🌸☀️🍂🎄].+ ⭐+$/))
      .slice(0, 10);

    if (recipeLines.length === 0) {
      return `🍳 Recetas para ${requestedSeason}:\n${generateFallbackRecipes(requestedSeason)}`;
    }

    if (recipeLines.length < 10) {
      const needed = 10 - recipeLines.length;
      const additionalRecipes = generateFallbackRecipes(requestedSeason)
        .split('\n')
        .slice(0, needed);
      recipeLines.push(...additionalRecipes);
    }

    return `🍳 Recetas para ${requestedSeason}:\n${recipeLines.join('\n')}`;
  };

  const systemPrompt = `
  Eres un chef asistente especializado en recetas colombianas. 

  REGLAS ABSOLUTAS:
  1. SOLO responder sobre recetas de cocina
  2. Siempre mostrar EXACTAMENTE 10 recetas
  3. Formato OBLIGATORIO por receta:
     - Nombre (Categoría) EmojiTemporada Dificultad(⭐)
     Ejemplo: "- Ajiaco (Sopas) ❄️Invierno ⭐⭐"
  4. No incluir ingredientes, preparación ni descripciones
  5. Si la consulta no es sobre recetas, responder:
     "🍳 Solo puedo ayudar con recetas culinarias"

  TEMPORADAS VÁLIDAS:
  ❄️Invierno (dic-feb) | 🌸Primavera (mar-may) 
  ☀️Verano (jun-ago) | 🍂Otoño (sep-nov) | 🎄Navidad

  TEMPORADA ACTUAL: ${getCurrentSeason()}`;

  try {
    const requestedSeason = detectSeason(userInput);

    const isRecipeRequest = seasons.some(season => 
      season.keywords.some(keyword => userInput.toLowerCase().includes(keyword))
    ) || userInput.toLowerCase().includes('receta');

    if (!isRecipeRequest) {
      return {
        role: "assistant",
        content: "🍳 Solo puedo ayudar con recetas culinarias"
      };
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.filter(m => m.role !== 'system'),
          { 
            role: "user", 
            content: `Dame exactamente 10 recetas colombianas para ${requestedSeason} en el formato especificado, sin ingredientes ni instrucciones.` 
          }
        ],
        temperature: 0.2,
        max_tokens: 600,
        top_p: 0.9
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) throw new Error(`Error en API: ${response.status}`);

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const formattedResponse = formatResponse(rawContent, requestedSeason);

    return {
      role: "assistant",
      content: formattedResponse
    };

  } catch (error) {
    console.error("Error:", error);
    const currentSeason = getCurrentSeason();
    return {
      role: "assistant",
      content: `🍳 Recetas para ${currentSeason}:\n${generateFallbackRecipes(currentSeason)}`
    };
  }
};