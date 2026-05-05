import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/public/Footer';
import Navbar from '../components/public/Navbar';
import PqrsModal from '../components/public/PqrsModal';
import WhatsappFloat from '../components/public/WhatsappFloat';
import CarBrandCarousel from '../components/public/CarBrandCarousel';

// Componente de Icono con estilo "Ingeniería Suave"
const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 inline-block p-5 bg-white shadow-xl rounded-2xl border-b-4 border-[#1A9E53] group-hover:-translate-y-2 transition-transform duration-300">
    <div className="text-[#1A9E53] w-8 h-8">
      {children}
    </div>
  </div>
);

const FEATURES = [
  {
    icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'DIAGNÓSTICO HIGH-TECH',
    desc: 'Precisión milimétrica con equipos de última generación para resultados exactos.'
  },
  {
    icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'REPUESTOS OEM',
    desc: 'Componentes originales que preservan la integridad y vida útil de tu motor.'
  },
  {
    icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M11.423 20.25a21.983 21.983 0 01-5.961-2.974m15.922-9.217a21.27 21.27 0 00-5.714-2.13m4.805 10.07a21.27 21.27 0 01-5.714 2.13m7.546-3.048A21.27 21.27 0 0021 12m-11.423 8.25c-4.406 0-8.52-1.755-11.25-4.636m19.747-9.393a11.966 11.966 0 00-2.434-2.198M11.423 2.25c4.406 0 8.52 1.755 11.25 4.636" /></svg>,
    title: 'INGENIERÍA DIÉSEL',
    desc: 'Expertos certificados bajo estándares internacionales de alto rendimiento.'
  },
];

const Home: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('opacity-100', 'translate-y-0');
            e.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#F8F9FA] text-[#211F1E] selection:bg-[#1A9E53] selection:text-white overflow-x-hidden">
      <Navbar activePage="home" />

      <main>
        {/* HERO: Cinematic con bordes redondeados inferiores */}
        <section className="relative h-[58vh] flex items-center overflow-hidden bg-[#211F1E] rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover scale-105"
              alt="Motor Diesel"
            />
          </div>

         <div className="container mx-auto px-6 mt-12 relative z-20 flex justify-center items-center min-h-[60vh]">
            <div className="max-w-3xl mt-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight uppercase font-title tracking-tighter">
                <span className="text-white">Especialistas en</span> <br />
                <span className="text-[#1A9E53]">Inyección Diésel</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 font-light max-w-xl border-l-4 border-[#1A9E53] pl-6 italic">
                Diagnóstico avanzado, repuestos certificados y mantenimiento profesional para maximizar el rendimiento de tu motor.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/servicios" className="bg-[#1A9E53] hover:bg-[#148243] text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 text-center shadow-lg shadow-[#1A9E53]/30">
                  Nuestros Servicios
                </Link>
                <Link to="/productos" className="backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white hover:text-black text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 text-center">
                  Ver Repuestos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS: Card Flotante Redondeada */}
        <section className="relative z-30 -mt-12 container mx-auto px-6">
          <div className="bg-white rounded-4xl shadow-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100">
            {[
              { val: '15+', lab: 'Años Trayectoria' },
              { val: '3k+', lab: 'Motores Listos' },
              { val: '2.5k', lab: 'Piezas Stock' },
              { val: '100%', lab: 'Garantía' },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left md:border-r last:border-none border-gray-100 px-4">
                <div className="text-4xl font-bold text-[#211F1E] font-title italic">{s.val}</div>
                <div className="text-[#1A9E53] text-[10px] uppercase tracking-widest font-black mt-1">{s.lab}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES: Cards redondeadas con hover suave */}
        <section className="py-32 container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {FEATURES.map((f, i) => (
              <div key={i} className="reveal opacity-0 translate-y-10 duration-700 delay-100 group p-8 rounded-4xl hover:bg-white hover:shadow-2xl border border-transparent hover:border-gray-100">
                <FeatureIcon>{f.icon}</FeatureIcon>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter group-hover:text-[#1A9E53] transition-colors italic">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORÍAS: Grid con imágenes redondeadas y overlays suaves */}
        {/* CARRUSEL DE MARCAS DE AUTOS */}
        <section className="bg-white py-10 rounded-[3rem] md:rounded-[5rem] my-10 shadow-inner">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-6 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]"
              >
                <span className="text-black">Nuestras</span>
                <br />
                <span className="text-black">Marcas Aliadas</span>
              </h2>
            </div>
            <CarBrandCarousel />
          </div>
        </section>
        {/* COMPONENTES ELITE */}
        <section className="bg-white py-24 rounded-[3rem] md:rounded-[5rem] my-10 shadow-inner">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold uppercase font-title italic tracking-tighter">Componentes Elite</h2>
                <div className="h-1.5 w-24 bg-[#1A9E53] mt-3 rounded-full mx-auto md:mx-0"></div>
              </div>
              <Link to="/productos" className="text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 border-2 border-[#211F1E] rounded-full hover:bg-[#211F1E] hover:text-white transition-all">Ver catálogo completo</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {['Bombas', 'Inyectores', 'Sensores', 'Filtros'].map((name, i) => (
                <div key={i} className="relative h-80 overflow-hidden group bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                  <img 
                    src={`/api/images/categorias/${name.toLowerCase()}.webp`} 
                    alt={name} 
                    className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#211F1E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <span className="text-xl font-bold uppercase italic text-[#211F1E] group-hover:text-white transition-colors">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARCAS: Estilo Moderno y Redondeado */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] mb-16 text-gray-400">Partners Tecnológicos</p>
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {['Bosch', 'Delphi', 'Denso', 'Siemens'].map((brand) => (
                <img key={brand} src={`/api/images/marcas/${brand.toLowerCase()}.webp`} alt={brand} className="h-10 w-auto object-contain" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsappFloat />
      <PqrsModal />
    </div>
  );
}

export default Home;