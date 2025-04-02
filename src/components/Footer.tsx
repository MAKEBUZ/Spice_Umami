import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="Spice & Umami Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-bold text-xl">
                Spice <span className="text-amber-500">&</span> Umami
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Tu guía culinaria con recetas, nutrición y un asistente de IA. Descubre, cocina y disfruta.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="https://instagram.com" icon="instagram" />
              <SocialIcon href="https://facebook.com" icon="facebook" />
              <SocialIcon href="https://twitter.com" icon="twitter" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/busca-recetas">Busca Recetas</FooterLink>
              <FooterLink href="/nutricion">Nutrición</FooterLink>
              <FooterLink href="/asistente">Asistente IA</FooterLink>
              <FooterLink href="/sobre-nosotros">Sobre Nosotros</FooterLink>
            </ul>
          </div>

          {/* APIs */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Tecnologías</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-1">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Next.js (Frontend)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-1">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>
                  <path d="M9.5 17h5"></path>
                  <path d="M9.5 12h5"></path>
                  <path d="M9.5 7h5"></path>
                </svg>
                <span>API Ninjas (Recetas)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-1">
                  <path d="M12 2v4"></path>
                  <path d="m16.24 7.76 2.83-2.83"></path>
                  <path d="M18 12h4"></path>
                  <path d="m16.24 16.24 2.83 2.83"></path>
                  <path d="M12 18v4"></path>
                  <path d="m7.76 16.24-2.83 2.83"></path>
                  <path d="M6 12H2"></path>
                  <path d="m7.76 7.76-2.83-2.83"></path>
                </svg>
                <span>CalorieNinjas (Nutrición)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-1">
                  <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"></path>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.9 4.9 1.4 1.4"></path>
                  <path d="m17.7 17.7 1.4 1.4"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.3 17.7-1.4 1.4"></path>
                  <path d="m19.1 4.9-1.4 1.4"></path>
                </svg>
                <span>Mistral IA (Asistente)</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contacto</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Calle Gourmet 123, Madrid, España</span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-1">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>info@spiceandumami.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Spice & Umami. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-gray-500 text-sm">
              <Link href="/privacidad" className="hover:text-amber-500 transition-colors duration-300">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-amber-500 transition-colors duration-300">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components (los mismos que antes)
const SocialIcon = ({ href, icon }: { href: string; icon: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
  >
    <div className="w-6 h-6">
      {icon === 'instagram' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
      )}
      {icon === 'facebook' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )}
      {icon === 'twitter' && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )}
    </div>
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link 
      href={href}
      className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

export default Footer;