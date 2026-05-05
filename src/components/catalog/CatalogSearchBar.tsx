import React from 'react';

interface CatalogSearchBarProps {
  searchInput: string;
  setSearchInput: (v: string) => void;
  onSearch: (e: React.FormEvent) => void;
  search: string;
  clearSearch: () => void;
  placeholder?: string;
}

const CatalogSearchBar: React.FC<CatalogSearchBarProps> = ({
  searchInput,
  setSearchInput,
  onSearch,
  search,
  clearSearch,
  placeholder = 'Buscar...'
}) => (
  <div className="max-w-4xl mx-auto -translate-y-1/2">
    <form 
      onSubmit={onSearch} 
      className="flex p-2 bg-white/80 backdrop-blur-xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white"
    >
      <input
        type="text"
        className="flex-grow px-8 py-4 bg-transparent text-sm font-medium focus:outline-none text-[#211F1E]"
        placeholder={placeholder}
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#211F1E] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A9E53] transition-all duration-300 shadow-lg active:scale-95"
      >
        Explorar
      </button>
      {search && (
        <button
          type="button"
          className="px-4 text-gray-400 hover:text-red-500 transition-colors"
          onClick={clearSearch}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </form>
  </div>
);

export default CatalogSearchBar;
