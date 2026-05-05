import React from 'react';

interface CatalogListProps<T> {
  items: T[];
  loading: boolean;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  renderCard: (item: T) => React.ReactNode;
}

function CatalogList<T>({ items, loading, totalPages, page, setPage, renderCard }: CatalogListProps<T>) {
  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#1A9E53]/20 border-t-[#1A9E53] rounded-full animate-spin mb-4"></div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sincronizando Base de Datos...</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {items.map(renderCard)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center gap-2">
          <button
            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-gray-200 text-[#211F1E] hover:bg-[#211F1E] hover:text-white transition-all disabled:opacity-20"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ←
          </button>
          <div className="bg-white px-6 h-12 rounded-2xl flex items-center border border-gray-200 shadow-sm">
            <span className="text-xs font-bold text-[#211F1E] uppercase tracking-tighter">Pág. {page} de {totalPages}</span>
          </div>
          <button
            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-gray-200 text-[#211F1E] hover:bg-[#211F1E] hover:text-white transition-all disabled:opacity-20"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            →
          </button>
        </div>
      )}
    </>
  );
}

export default CatalogList;
