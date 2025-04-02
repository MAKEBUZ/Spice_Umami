import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Spice & Umami | Recetario con Información Nutricional',
  description: 'Descubre recetas deliciosas y conoce la información nutricional de todos los ingredientes en nuestro recetario completo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans bg-neutral-900 text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}