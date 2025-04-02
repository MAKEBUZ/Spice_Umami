import { NutritionItem } from '../services/api-nutrition';

interface NutritionCardProps {
  item: NutritionItem;
}

const NutritionCard = ({ item }: NutritionCardProps) => {
  const getValueColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage > 75) return 'text-red-400';
    if (percentage > 50) return 'text-amber-400';
    if (percentage > 25) return 'text-lime-400';
    return 'text-emerald-400';
  };

  return (
    <section className="bg-neutral-800 rounded-lg p-6 h-full border border-neutral-700 hover:border-amber-500 transition-colors duration-300">
      <section className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{item.originalName}</h3>
        <span className="text-amber-500 font-medium bg-neutral-900 px-3 py-1 rounded-full text-sm">
          {item.serving_size_g}g
        </span>
      </section>
      
      <section className="space-y-4">
        <section>
          <section className="flex justify-between mb-1">
            <span className="text-neutral-300">Calorías</span>
            <span className={`font-medium ${getValueColor(item.calories, 500)}`}>
              {item.calories.toFixed(1)}
            </span>
          </section>
          <section className="w-full bg-neutral-700 rounded-full h-2">
            <section 
              className="bg-amber-500 h-2 rounded-full" 
              style={{ width: `${Math.min(item.calories / 5, 100)}%` }}
            ></section>
          </section>
        </section>
        
        <section className="grid grid-cols-3 gap-3">
          <section className="bg-neutral-700/50 p-3 rounded-lg">
            <p className="text-neutral-400 text-sm">Proteínas</p>
            <p className="text-white font-medium">{item.protein_g}g</p>
          </section>
          <section className="bg-neutral-700/50 p-3 rounded-lg">
            <p className="text-neutral-400 text-sm">Carbohidratos</p>
            <p className="text-white font-medium">{item.carbohydrates_total_g}g</p>
          </section>
          <section className="bg-neutral-700/50 p-3 rounded-lg">
            <p className="text-neutral-400 text-sm">Grasas</p>
            <p className="text-white font-medium">{item.fat_total_g}g</p>
          </section>
        </section>
        
        <section className="space-y-2">
          <section className="flex justify-between">
            <span className="text-neutral-400">Azúcares</span>
            <span className="text-white">{item.sugar_g}g</span>
          </section>
          <section className="flex justify-between">
            <span className="text-neutral-400">Fibra</span>
            <span className="text-white">{item.fiber_g}g</span>
          </section>
          <section className="flex justify-between">
            <span className="text-neutral-400">Grasas Saturadas</span>
            <span className="text-white">{item.fat_saturated_g}g</span>
          </section>
          <section className="flex justify-between">
            <span className="text-neutral-400">Sodio</span>
            <span className="text-white">{item.sodium_mg}mg</span>
          </section>
          <section className="flex justify-between">
            <span className="text-neutral-400">Potasio</span>
            <span className="text-white">{item.potassium_mg}mg</span>
          </section>
          <section className="flex justify-between">
            <span className="text-neutral-400">Colesterol</span>
            <span className="text-white">{item.cholesterol_mg}mg</span>
          </section>
        </section>
      </section>
    </section>
  );
};

export { NutritionCard };