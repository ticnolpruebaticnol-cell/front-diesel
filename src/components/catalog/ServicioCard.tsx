import React from 'react';
import { Servicio } from '../../services/product';
import ProductImage from './ProductImage';

const ServicioCard: React.FC<{ servicio: Servicio }> = ({ servicio }) => (
  <div
    key={servicio.Autonumerico ?? `${servicio.Codigo_Producto}-${servicio.Descripcion}`}
    className="group bg-white rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col relative overflow-hidden"
  >
    {/* Decoración de fondo de la tarjeta */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#1A9E53]/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
    <div className="relative z-10 flex-grow">
      <ProductImage codigo={servicio.Codigo_Producto} alt={servicio.Descripcion || servicio["Descripción"] || 'Servicio'} />
      <div className="flex justify-between items-start mb-8">
        <div className="px-3 py-1 bg-[#211F1E] rounded-full">
          <span className="text-[9px] font-black text-[#1A9E53] uppercase tracking-tighter">
            TECH SERIES
          </span>
        </div>
        <span className="text-[10px] font-mono text-gray-300 font-bold uppercase">
          #{servicio.Codigo_Producto || 'ID-XXX'}
        </span>
      </div>
      <h3 className="text-xl font-bold text-[#211F1E] mb-4 leading-[1.1] uppercase italic font-title group-hover:text-[#1A9E53] transition-colors duration-300">
        {servicio.Descripcion || servicio["Descripción"] || 'Servicio'}
      </h3>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-3xl font-black text-[#211F1E]">
          {typeof servicio.Precio1 === 'number' ? `$${Math.round(servicio.Precio1).toLocaleString('es-CO')}` : '---'}
        </span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">COP</span>
      </div>
    </div>
    <div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
      <div className="flex flex-col">
        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Disponibilidad</span>
        <span className="text-[10px] font-bold text-[#1A9E53] uppercase italic">Inmediata</span>
      </div>
      <button className="h-12 w-12 bg-[#F8F9FA] rounded-2xl flex items-center justify-center text-[#211F1E] group-hover:bg-[#1A9E53] group-hover:text-white transition-all duration-300 shadow-sm">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </div>
);

export default ServicioCard;
