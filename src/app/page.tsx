"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    window.location.href = `/busca-recetas?q=${encodeURIComponent(query)}`;
  };

  return (
    <main className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Spice & Umami hero background" 
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Spice <span className="text-amber-500">&</span> Umami
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neutral-300">
              Tu guía culinaria con información nutricional detallada
            </p>
            
            {/* Updated Search Bar */}
            <div className="w-full max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Busca recetas por nombre o ingredientes (ej: pollo, pasta, ensalada)..."
                  className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors duration-300 disabled:opacity-70"
                  disabled={loading || !query.trim()}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buscando...
                    </span>
                  ) : 'Buscar'}
                </button>
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/busca-recetas" 
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors duration-300 text-center"
              >
                Explorar Recetas
              </Link>
              <Link 
                href="/nutricion" 
                className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white rounded-md transition-colors duration-300 text-center"
              >
                Información Nutricional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Descubre <span className="text-amber-500">Spice & Umami</span>
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Todo lo que necesitas para tus aventuras culinarias en un solo lugar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-neutral-800 p-8 rounded-lg hover:bg-neutral-700 transition-colors duration-300 border border-neutral-700">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Búsqueda Avanzada</h3>
              <p className="text-neutral-300 text-center">
                Encuentra recetas por ingredientes, tipo de cocina o valor nutricional con nuestro potente buscador.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-neutral-800 p-8 rounded-lg hover:bg-neutral-700 transition-colors duration-300 border border-neutral-700">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Información Detallada</h3>
              <p className="text-neutral-300 text-center">
                Datos nutricionales precisos para cada ingrediente y receta, con desglose de macros y micronutrientes.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-neutral-800 p-8 rounded-lg hover:bg-neutral-700 transition-colors duration-300 border border-neutral-700">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 14v.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Dietas Especiales</h3>
              <p className="text-neutral-300 text-center">
                Filtra recetas por restricciones dietéticas como sin gluten, vegano, bajo en carbohidratos y más.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            ¿Listo para comenzar tu viaje culinario?
          </h2>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Descubre miles de recetas con información nutricional completa y empieza a cocinar hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/busca-recetas" 
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors duration-300"
            >
              Explorar Recetas
            </Link>
            <Link 
              href="/nutricion" 
              className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white rounded-md transition-colors duration-300"
            >
              Ver Nutrición
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}