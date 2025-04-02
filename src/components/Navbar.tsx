'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_ITEMS = [
  { path: '/', name: 'Inicio' },
  { path: '/busca-recetas', name: 'Busca Recetas' },
  { path: '/nutricion', name: 'Nutrición' },
  { path: '/asistente', name: 'Asistente IA' },
  { path: '/sobre-nosotros', name: 'Sobre Nosotros' },
  { path: '/contacto', name: 'Contacto', mobileOnly: true }
];

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', icon: 'instagram' },
  { href: 'https://facebook.com', icon: 'facebook' },
  { href: 'https://twitter.com', icon: 'twitter' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-900/95 py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <section className="container mx-auto px-4">
        <section className="flex items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <section className="relative w-10 h-10">
              <Image src="/logo.png" alt="Spice & Umami Logo" fill className="object-contain"/>
            </section>
            <section className="font-bold text-xl md:text-2xl">
              Spice <span className="text-amber-500">&</span> Umami
            </section>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.filter(item => !item.mobileOnly).map((item) => (
              <NavLink key={item.path} href={item.path}>{item.name}</NavLink>
            ))}
          </nav>

          <button 
            className="md:hidden relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <section className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></section>
            <section className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></section>
            <section className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></section>
          </button>
        </section>
      </section>

      <section className={`fixed inset-0 bg-neutral-900 transition-all duration-300 flex flex-col items-center justify-center ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center gap-6 text-xl">
          {NAV_ITEMS.map((item) => (
            <MobileNavLink 
              key={item.path} 
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </MobileNavLink>
          ))}
        </nav>

        <section className="absolute bottom-8 flex gap-6">
          {SOCIAL_LINKS.map((social) => (
            <SocialIcon key={social.href} href={social.href} icon={social.icon} />
          ))}
        </section>
      </section>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-white hover:text-amber-500 transition-colors duration-300">
    {children}
  </Link>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <Link href={href} onClick={onClick} className="text-white hover:text-amber-500 transition-colors duration-300 py-2">
    {children}
  </Link>
);

const SocialIcon = ({ href, icon }: { href: string; icon: string }) => {
  const Icon = () => {
    switch(icon) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-500 transition-colors duration-300">
      <section className="w-6 h-6">
        <Icon />
      </section>
    </a>
  );
};

export default Navbar;