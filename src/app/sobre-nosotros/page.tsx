"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <section className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Sobre <span className="text-amber-500">Nosotros</span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Descubre la pasión y tecnología detrás de Spice & Umami
          </p>
        </section>

        <section className="max-w-4xl mx-auto">
          <section className="mb-16">
            <section className="flex flex-col md:flex-row gap-8 items-center">
            <section className="md:w-1/2">
  <section className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
    <Image
      src="/spice_umami.png"
      alt="Equipo Spice & Umami"
      fill
      className="object-contain"
      priority
    />
  </section>
</section>
              <section className="md:w-1/2">
                <h2 className="text-2xl font-bold text-white mb-4">🌶️ Spice & Umami</h2>
                <p className="text-neutral-300 mb-4">
                  Spice & Umami es una plataforma culinaria que combina Next.js en el frontend con APIs especializadas para la búsqueda de recetas e información nutricional. Nuestro asistente con IA Mistral te ayuda a descubrir recetas perfectas para cada ocasión.
                </p>
                <section className="bg-neutral-800 p-4 rounded-lg border-l-4 border-amber-500">
                  <p className="text-neutral-300 italic">
                    &quot;Nuestra misión es hacer que la cocina saludable sea accesible y divertida para todos.&quot;
                  </p>
                </section>
              </section>
            </section>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">🚀 Características</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span>📅</span> Recomendaciones estacionales
                </h3>
                <p className="text-neutral-300">
                  Descubre recetas y productos frescos según la temporada del año. Nuestro sistema te sugiere los mejores ingredientes para cada estación.
                </p>
              </section>
              <section className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span>🤖</span> Chatbot con IA (Mistral)
                </h3>
                <p className="text-neutral-300">
                  Nuestro asistente inteligente responde preguntas y sugiere recetas personalizadas basadas en tus preferencias y lo que tengas en tu refrigerador.
                </p>
              </section>
              <section className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span>🔍</span> Búsqueda avanzada
                </h3>
                <p className="text-neutral-300">
                  Encuentra recetas, información nutricional e ingredientes específicos mediante nuestras APIs especializadas.
                </p>
              </section>
              <section className="bg-neutral-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span>⚡</span> Interfaz moderna
                </h3>
                <p className="text-neutral-300">
                  Construida con Next.js para una experiencia rápida y fluida, con diseño responsive que se adapta a cualquier dispositivo.
                </p>
              </section>
            </section>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">🛠️ Tecnologías utilizadas</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <section className="bg-neutral-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-white mb-3">🏗 Frontend</h3>
                <p className="text-neutral-300">Next.js</p>
              </section>
              <section className="bg-neutral-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-white mb-3">🌐 APIs</h3>
                <ul className="text-neutral-300 space-y-1">
                  <li>
                    <Link href="https://www.api-ninjas.com/api/recipe" target="_blank" className="hover:text-amber-500">
                      Spoonacular (Recetas)
                    </Link>
                  </li>
                  <li>
                    <Link href="https://calorieninjas.com/api" target="_blank" className="hover:text-amber-500">
                      CalorieNinjas (Nutrición)
                    </Link>
                  </li>
                </ul>
              </section>
              <section className="bg-neutral-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-white mb-3">🤖 Chatbot</h3>
                <p className="text-neutral-300">Mistral IA</p>
              </section>
            </section>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">👨‍🍳 Nuestro Equipo</h2>
            <p className="text-neutral-300 mb-8">
              Somos un equipo apasionado por la gastronomía y la tecnología, comprometidos con crear herramientas que hagan la cocina más accesible y divertida.
            </p>
          </section>
        </section>
      </section>
    </main>
  );
}