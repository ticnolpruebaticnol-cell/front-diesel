import React, { useEffect, useState } from 'react';
import { CarBrand } from '../../services/carBrand';
import { getLocalCarBrands } from '../../services/getLocalCarBrands';

const CarBrandCarousel: React.FC = () => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocalCarBrands().then(setBrands).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Cargando marcas...</div>;

  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="flex gap-8 items-center animate-scroll-x">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center min-w-30">
            <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-center h-20 w-20 mb-2 border border-gray-100">
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-12 w-auto object-contain"
                onError={(e) => (e.currentTarget.src = '/api/images/marcas/generic.webp')}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 text-center truncate w-20">{brand.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CarBrandCarousel;
