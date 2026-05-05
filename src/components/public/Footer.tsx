import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
<footer className="bg-[#211F1E] text-white border-t border-white/5 rounded-t-3xl md:rounded-t-[3rem]">      
<div className="container mx-auto px-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Branding */}
          <div className="col-span-1 md:col-span-1 mt-4">
            <img 
              src={logo}
              alt="Logo Innovadiesel" 
              className="h-30 w-auto mb-6"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Líderes en tecnología de inyección diésel. Precisión, potencia y respaldo técnico garantizado.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-[#1A9E53] text-xs font-bold uppercase tracking-[0.2em] mb-6 font-title">
              Explorar
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/servicios" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Servicios Técnicos</Link></li>
              <li><Link to="/productos" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Catálogo de Repuestos</Link></li>
              <li><Link to="/sobre-nosotros" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Nuestra Tecnología</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-[#1A9E53] text-xs font-bold uppercase tracking-[0.2em] mb-6 font-title">
              Soporte
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contacto" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Centro de Contacto</Link></li>
              <li><Link to="/ubicacion" className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Sedes y Laboratorios</Link></li>
              <li><button className="text-gray-300 hover:text-white transition-colors uppercase tracking-wider">Garantías</button></li>
            </ul>
          </div>

          {/* Columna 4: Newsletter / Social */}
          <div>
            <h4 className="text-[#1A9E53] text-xs font-bold uppercase tracking-[0.2em] mb-6 font-title">
              Mantente Conectado
            </h4>
            <div className="flex gap-4">
              {/* Iconos de redes sociales en versión minimalista */}
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1A9E53] hover:border-[#1A9E53] transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#1A9E53] hover:border-[#1A9E53] transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.3-.1 1.7-.1 4.9-.1m0-2C8.7 0 8.3 0 7.1.1 5.8.1 5 .4 4.1.7c-.9.3-1.6.8-2.3 1.5-.7.7-1.2 1.4-1.5 2.3-.4.9-.6 1.7-.6 3s-.1 1.2-.1 4.9.1 3.7.1 5 0 1.2.1 2.5c.3.9.8 1.6 1.5 2.3.7.7 1.4 1.2 2.3 1.5.9.4 1.7.6 3 .6s1.2.1 4.9.1 3.7 0 5-.1 1.2-.1 2.5-.3c.9-.3 1.6-.8 2.3-1.5.7-.7 1.2-1.4 1.5-2.3.4-.9.6-1.7.6-3s.1-1.2.1-4.9-.1-3.7-.1-5c0-1.2-.1-2.5-.3-3.4-.3-.9-.8-1.6-1.5-2.3-.7-.7-1.4-1.2-2.3-1.5-.9-.4-1.7-.6-3-.6-1.3-.1-1.7-.1-5-.1z"/><path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8z"/><circle cx="18.4" cy="5.6" r="1.4"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            &copy; {currentYear} INNOVADIESEL SAS — LABORATORIO, DIAGNOSTICENTRO Y REPUESTOS.
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Términos</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;