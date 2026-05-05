import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

interface AuthUser {
  firstName?: string;
  email?: string;
  role?: string;
}

const Navbar: React.FC<{ activePage?: string }> = ({ activePage = '' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setAuthUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem('user');
    }
  }, []);

  const logout = () => {
    ['user', 'userRole', 'userName', 'userId'].forEach(k => localStorage.removeItem(k));
    window.location.href = '/';
  };

  const internalPanelUrl = (): string | null => {
    const role = (authUser?.role || '').toLowerCase();
    if (['administrador', 'admin', 'mecánico', 'mecanico', 'recepcionista'].includes(role)) 
      return '/innovacustom/public/dashboard.html';
    if (role === 'asesor') return '/innovacustom/public/asesorias.html';
    if (role === 'laboratorio') return '/innovacustom/public/laboratorio.html';
    return null;
  };

  const panelUrl = internalPanelUrl();
  const userName = authUser?.firstName || authUser?.email?.split('@')[0] || 'Usuario';

  return (
    <header 
      className={`  navbar-bebas fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'navbar-bebas bg-white/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO: Con efecto de brillo metálico */}
        <Link to="/" className="relative group overflow-hidden">
          <img
            src={logo}
            alt="Logo Innovadiesel"
            className={`transition-all duration-500 ${
              scrolled ? 'h-30' : 'h-30'
            } rounded-sm filter drop-shadow-md group-hover:brightness-110`}
          />
        </Link>

        {/* NAVEGACIÓN: Tipografía Ford/Century Gothic */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { to: '/', label: 'Inicio', key: 'home' },
            { to: '/servicios', label: 'Servicios', key: 'servicios' },
            { to: '/productos', label: 'Productos', key: 'productos' },
            { to: '/contacto', label: 'Contacto', key: 'contacto' },
          ].map(({ to, label, key }) => (
            <Link 
              key={key} 
              to={to} 
              className={`text-[15px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative py-2
                ${activePage === key ? 'text-[#1A9E53]' : scrolled ? 'text-[#211F1E]' : 'text-white'}
                hover:text-[#1A9E53] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1A9E53] hover:after:w-full after:transition-all
              `}
            >
              {label}
            </Link>
          ))}
          <a 
            href="https://dieselsoluciones.com/" 
            target="_blank" 
            rel="noopener" 
            className={`text-[11px] font-bold uppercase tracking-[0.25em] flex items-center gap-1 border-l pl-6 transition-colors
              ${scrolled ? 'text-gray-400 border-gray-200 hover:text-[#1A9E53]' : 'text-white/60 border-white/20 hover:text-white'}
            `}
          >
            DieselSoluciones <span className="text-[28px] opacity-50">↗</span>
          </a>
        </nav>

        {/* ACCIONES DE USUARIO */}
        <div className="flex items-center gap-6">
          {!authUser ? (
            <Link 
              to="/login" 
              className={`flex items-center gap-2 group transition-all duration-300`}
            >
              <div className={`p-2 rounded-full border transition-all duration-300 ${
                scrolled ? 'border-gray-200 group-hover:bg-gray-100' : 'border-white/20 group-hover:bg-white/10'
              }`}>
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className={`w-5 h-5 ${scrolled ? 'text-[#211F1E]' : 'text-white'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className={`text-[10px] font-bold uppercase tracking-widest hidden lg:block ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>
                {userName}
              </span>
              
              <div className="flex gap-2">
                {panelUrl && (
                  <a href={panelUrl} className="p-2 rounded-md bg-[#1A9E53]/10 text-[#1A9E53] hover:bg-[#1A9E53] hover:text-white transition-all">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6z" />
                    </svg>
                  </a>
                )}
                <button onClick={logout} className="p-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* BOTÓN CTA PRINCIPAL: Estilo Industrial */}
          <Link 
            to="/servicios" 
            className="bg-[#1A9E53] hover:bg-[#148243] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all duration-300 shadow-lg shadow-[#1A9E53]/20"
          >
            Servicios
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;