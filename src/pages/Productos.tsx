import React, { useEffect, useState } from 'react';
import { getProducts, Product, ProductListResponse } from '../services/product';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WhatsappFloat from '../components/public/WhatsappFloat';
import PqrsModal from '../components/public/PqrsModal';
import CatalogSearchBar from '../components/catalog/CatalogSearchBar';
import CatalogList from '../components/catalog/CatalogList';
import ProductoCard from '../components/catalog/ProductoCard';

const PAGE_SIZE = 24;

const Productos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts(page, PAGE_SIZE, search)
      .then((res: ProductListResponse) => {
        setProducts(res.data);
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
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      <Navbar activePage="productos" />
      
      {/* Header Futurista con Gradiente Dinámico */}
      <section className="bg-[#211F1E] pt-40 pb-24 text-white relative overflow-hidden">
        {/* Círculos de luz de fondo (Efecto futurista) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1A9E53] opacity-10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#1A9E53] opacity-5 blur-[80px] rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[#1A9E53] text-xs font-bold uppercase tracking-[0.5em] mb-4 block">
              Innova Diesel Labs
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
              SISTEMAS DE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A9E53] to-[#2ecc71]">
                PRECISIÓN
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed border-l border-gray-700 pl-6">
              Componentes de inyección con certificación de rendimiento extremo. 
              Tecnología diésel para el mundo real.
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
          placeholder="Buscar por código o componente..."
        />

        <CatalogList
          items={products}
          loading={loading}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          renderCard={product => <ProductoCard product={product} />}
        />
      </main>

      <Footer />
      <WhatsappFloat />
      <PqrsModal />
    </div>
  );
};

export default Productos;