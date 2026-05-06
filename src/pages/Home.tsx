import React, { useEffect } from "react";
import "../scrollbar-hide.css";
import { Link } from "react-router-dom";

import Footer from "../components/public/Footer";
import Navbar from "../components/public/Navbar";
import PqrsModal from "../components/public/PqrsModal";
import WhatsappFloat from "../components/public/WhatsappFloat";
import CarBrandCarousel from "../components/public/CarBrandCarousel";
import { FaMedal } from "react-icons/fa";

// Componente de Icono Unificado
const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 inline-block p-5 bg-white shadow-xl rounded-2xl border-b-4 border-[#1A9E53] group-hover:-translate-y-2 transition-transform duration-300">
    <div className="text-[#1A9E53] w-8 h-8">{children}</div>
  </div>
);

const FEATURES = [
  {
    icon: <FaMedal className="w-8 h-8 text-[#1A9E53]" />,
    title: "DIAGNÓSTICO HIGH-TECH",
    desc: "Precisión milimétrica con equipos de última generación para resultados exactos.",
  },
  {
    icon: <FaMedal className="w-8 h-8 text-[#1A9E53]" />,
    title: "REPUESTOS OEM",
    desc: "Componentes originales que preservan la integridad y vida útil de tu motor.",
  },
  {
    icon: <FaMedal className="w-8 h-8 text-[#1A9E53]" />,
    title: "INGENIERÍA DIÉSEL",
    desc: "Expertos certificados bajo estándares internacionales de alto rendimiento.",
  },
];

const Home: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Estilo de sombra y borde común para todas las secciones blancas
  const sectionUnifiedStyle = "bg-white rounded-[3rem] md:rounded-[5rem] border-b-4 border-[#1A9E53] shadow-xl mx-auto w-[90%] transition-all duration-500";
  const sectionFilter = { filter: "drop-shadow(0 15px 30px rgba(26,158,83,0.15))" };

  return (
    <div className="bg-[#F8F9FA] text-[#211F1E] selection:bg-[#1A9E53] selection:text-white overflow-x-hidden">
      <Navbar activePage="home" />

      <main className="flex flex-col gap-16 md:gap-24 mb-24">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[70vh] md:h-[75vh] flex items-center overflow-hidden bg-[#211F1E] rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&q=80"
              className="w-full h-full object-cover"
              alt="Motor Diesel"
            />
          </div>

          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-4xl flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.1] uppercase font-title tracking-tighter">
                <span className="text-white">Especialistas en</span> <br />
                <span className="text-[#1A9E53]">Inyección Diésel</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-12 font-light max-w-xl border-l-4 border-[#1A9E53] pl-6 italic">
                Diagnóstico avanzado, repuestos certificados y mantenimiento profesional para maximizar el rendimiento de tu motor.
              </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
                <Link to="/servicios" className="bg-[#1A9E53] hover:bg-[#148243] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all text-center shadow-lg shadow-[#1A9E53]/30">
                  Nuestros Servicios
                </Link>
                <Link to="/productos" className="backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white hover:text-black text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all text-center">
                  Ver Repuestos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATS SECTION */}
        <section className="container mx-auto px-6 -mt-32 relative z-30">
          <div className={`${sectionUnifiedStyle} p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8`} style={sectionFilter}>
            {[
              { val: "15+", lab: "Años Trayectoria" },
              { val: "3k+", lab: "Motores Listos" },
              { val: "2.5k", lab: "Piezas Stock" },
              { val: "100%", lab: "Garantía" },
            ].map((s, i) => (
              <div key={i} className="text-center md:border-r last:border-none border-gray-100 flex flex-col items-center justify-center">
                <div className="text-4xl md:text-5xl font-bold text-[#211F1E] font-title italic">{s.val}</div>
                <div className="text-[#1A9E53] text-[10px] md:text-xs uppercase tracking-[0.2em] font-black mt-2">{s.lab}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 w-[90%] mx-auto">
            {FEATURES.map((f, i) => (
              <div key={i} className="reveal opacity-0 translate-y-10 duration-700 group p-10 rounded-[2.5rem] bg-white border border-gray-50 hover:shadow-2xl transition-all">
                <FeatureIcon>{f.icon}</FeatureIcon>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter group-hover:text-[#1A9E53] transition-colors italic">
                  {f.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MARCAS ALIADAS SECTION */}
        <section className={sectionUnifiedStyle} style={sectionFilter}>
          <div className="container mx-auto px-6 py-16 overflow-auto scrollbar-hide">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl !text-black font-bold uppercase font-title italic tracking-tighter">
                Nuestras <span className="text-[#1A9E53]">Marcas Aliadas</span>
              </h2>
              <div className="h-1.5 w-24 bg-[#1A9E53] mt-3 rounded-full mx-auto"></div>
            </div>
            <CarBrandCarousel />
          </div>
        </section>

        {/* 5. COMPONENTES ELITE SECTION */}
        <section className={sectionUnifiedStyle} style={sectionFilter}>
          <div className="container mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold uppercase font-title italic tracking-tighter text-black !text-black">
                  Componentes Elite
                </h2>
                <div className="h-1.5 w-24 bg-[#1A9E53] mt-3 rounded-full mx-auto md:mx-0"></div>
              </div>
              <Link to="/productos" className="text-xs font-bold uppercase tracking-[0.2em] px-8 py-3 border-2 border-[#211F1E] rounded-full hover:bg-[#211F1E] hover:text-white transition-all">
                Ver catálogo completo
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Bombas", file: "bombas.png" },
                { name: "Inyectores", file: "inyectores.png" },
                { name: "Sensores", file: "sensores.png" },
                { name: "Filtros", file: "filtros.png" },
              ].map(({ name, file }, i) => (
                <div key={i} className="relative h-72 overflow-hidden group bg-gray-50 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all duration-500">
                  <img src={`/categorias/${file}`} alt={name} className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white to-transparent text-center">
                    <span className="text-lg font-bold uppercase italic text-[#211F1E] group-hover:text-[#1A9E53] transition-colors">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PARTNERS TECNOLÓGICOS SECTION */}
        <section className={sectionUnifiedStyle} style={sectionFilter}>
          <div className="container mx-auto px-6 py-16">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-gray-400">
              Partners Tecnológicos
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              {["Bosch", "Delphi", "Denso", "Siemens"].map((brand) => (
                <img key={brand} src={`/api/images/marcas/${brand.toLowerCase()}.webp`} alt={brand} className="h-8 md:h-10 w-auto object-contain" />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      {/* <WhatsappFloat /> */}
      <PqrsModal />
    </div>
  );
};

export default Home;