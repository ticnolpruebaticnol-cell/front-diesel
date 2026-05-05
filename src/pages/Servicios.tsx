import React, { useEffect, useState } from 'react';
import { getServicios, Servicio, ServicioListResponse } from '../services/product';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WhatsappFloat from '../components/public/WhatsappFloat';
import PqrsModal from '../components/public/PqrsModal';
import CatalogSearchBar from '../components/catalog/CatalogSearchBar';
import CatalogList from '../components/catalog/CatalogList';
import ServicioCard from '../components/catalog/ServicioCard';

const PAGE_SIZE = 24;

const Servicios: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getServicios(page, PAGE_SIZE, search)
      .then((res: ServicioListResponse) => {
        setServicios(res.data);
        setTotal(res.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, search]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#211F1E] selection:bg-[#1A9E53] selection:text-white">
      <Navbar activePage="servicios" />
      
      {/* Hero: Estilo Futurista Redondeado */}
      <section className="bg-[#211F1E] pt-40 pb-24 relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[#1A9E53] font-black text-xs uppercase tracking-[0.5em] mb-4 block">
              High-Precision Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A9E53] to-[#2ecc71]">LAB</span> & SUPPORT
            </h1>
            <p className="text-gray-400 max-w-xl text-sm uppercase tracking-[0.2em] font-light border-l border-[#1A9E53] pl-6">
              Soporte técnico avanzado y diagnóstico computarizado para sistemas de inyección de última generación.
            </p>
          </div>
        </div>
      </section>


      <main className="container mx-auto px-6 pb-24">
        <CatalogSearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearch={handleSearch}
          search={search}
          clearSearch={() => { setSearch(''); setSearchInput(''); setPage(1); }}
          placeholder="Buscar por código o servicio..."
        />

        {/* Status Area */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl mb-12">
            <p className="text-red-700 font-bold uppercase text-xs tracking-widest">{error}</p>
          </div>
        )}

        <CatalogList
          items={servicios}
          loading={loading}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          renderCard={servicio => <ServicioCard servicio={servicio} />}
        />
      </main>

      <Footer />
      <WhatsappFloat />
      <PqrsModal />
    </div>
  );
};

export default Servicios;