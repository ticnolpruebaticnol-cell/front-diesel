import React, { useEffect, useState } from 'react';
import AuthPopup from './AuthPopup';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import CartPopup from '../catalog/CartPopup';
import { useCart } from '../../context/CartContext';
// import UserPurchases from './UserPurchases';

interface AuthUser {
  firstName?: string;
  email?: string;
  role?: string;
}

const Navbar: React.FC<{ activePage?: string }> = ({ activePage = '' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil
  // const [showPurchases, setShowPurchases] = useState(false); // Estado para mostrar compras
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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

  const menuItems = [
    { to: '/', label: 'Inicio', key: 'home' },
    { to: '/servicios', label: 'Servicios', key: 'servicios' },
    { to: '/productos', label: 'Productos', key: 'productos' },
    { to: '/contacto', label: 'Contacto', key: 'cocto' },
  ];

  return (
    <>

      <header 
        className={`navbar-bebas fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled || isOpen ? 'bg-white/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* BOTÓN HAMBURGUESA (Solo visible en móvil, a la izquierda) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 focus:outline-none"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-[#1A9E53] transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-[#1A9E53] ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-[#1A9E53] transition-all ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>

          {/* LOGO */}
          <Link to="/" className="relative group overflow-hidden">
            <img
              src={logo}
              alt="Logo Innovadiesel"
              className="h-12 md:h-16 transition-all duration-500 rounded-sm filter drop-shadow-md group-hover:brightness-110"
            />
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-10">
            {menuItems.map(({ to, label, key }) => (
              <Link 
                key={key} 
                to={to} 
                className={`text-lg font-bold uppercase tracking-widest transition-all duration-300 relative py-2 px-2 mx-1
                  ${activePage === key ? 'text-[#1A9E53] border-b-4 border-[#1A9E53]' : scrolled ? 'text-[#211F1E]' : 'text-white'}
                  hover:text-[#1A9E53] hover:scale-105 after:content-["" ] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#1A9E53] hover:after:w-full after:transition-all
                `}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/compras"
              className={`text-lg font-bold uppercase tracking-widest transition-all duration-300 relative py-2 px-2 mx-1 ${scrolled ? 'text-[#211F1E]' : 'text-white'} hover:text-[#1A9E53] hover:scale-105`}
            >
              Mis Compras
            </Link>
            <button
              className={`text-lg font-bold uppercase tracking-widest transition-all duration-300 relative py-2 px-2 mx-1 ${scrolled ? 'text-[#211F1E]' : 'text-white'} hover:text-[#1A9E53] hover:scale-105`}
              onClick={() => setShowAuth(true)}
            >
              Login
            </button>
            <button
              className={`text-lg font-bold uppercase tracking-widest transition-all duration-300 relative py-2 px-2 mx-1 ${scrolled ? 'text-[#211F1E]' : 'text-white'} hover:text-[#1A9E53] hover:scale-105 flex items-center gap-2`}
              onClick={() => setShowCart(true)}
              aria-label="Abrir carrito de compras"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 5h12M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span>Carrito</span>
              {cartItemsCount > 0 && (
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-[#1A9E53] text-white text-[10px] font-black flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </nav>

          {/* ACCIONES DE USUARIO DESKTOP */}
          <div className="hidden md:flex items-center gap-4 md:gap-6" />
        </div>
      </header>

      {/* MENÚ LATERAL MÓVIL (Slide from left) */}
      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay oscuro */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>
        
        {/* Contenido del menú */}
        <aside className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} pt-24 px-6`}>
          <nav className="flex flex-col gap-6">
            {menuItems.map(({ to, label, key }) => (
              <Link 
                key={key} 
                to={to} 
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold uppercase tracking-widest ${activePage === key ? 'text-[#1A9E53]' : 'text-[#211F1E]'}`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/compras"
              className="text-lg font-bold uppercase tracking-widest text-[#211F1E] bg-green-600 px-3 py-1 rounded shadow hover:bg-green-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Mis Compras
            </Link>
            <button
              className="text-lg font-bold uppercase tracking-widest text-[#211F1E] bg-white px-3 py-1 rounded shadow hover:text-[#1A9E53] text-left"
              onClick={() => {
                setIsOpen(false);
                setShowAuth(true);
              }}
            >
              Login
            </button>
            <button
              className="text-lg font-bold uppercase tracking-widest text-[#211F1E] bg-white px-3 py-1 rounded shadow hover:text-[#1A9E53] flex items-center gap-2"
              onClick={() => {
                setIsOpen(false);
                setShowCart(true);
              }}
              aria-label="Abrir carrito de compras"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4zM7 13l-1 5h12M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span>Carrito</span>
              {cartItemsCount > 0 && (
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-[#1A9E53] text-white text-[10px] font-black flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <hr className="border-gray-100" />
            {/* <a 
              href="https://dieselsoluciones.com/" 
              target="_blank" 
              rel="noopener" 
              className="text-xs font-bold uppercase text-gray-400 tracking-widest"
            >
              DieselSoluciones ↗
            </a> */}
          </nav>
        </aside>
      </div>
      {showAuth && <AuthPopup onClose={() => setShowAuth(false)} />}
      <CartPopup open={showCart} onClose={() => setShowCart(false)} onCheckout={() => {}} />
    </>
  );
};

export default Navbar;