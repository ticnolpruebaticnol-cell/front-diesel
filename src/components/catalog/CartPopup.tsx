import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createPaymentPreference, createPurchase } from '../../services/product';

interface CartPopupProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  loading?: boolean;
}

const CartPopup: React.FC<CartPopupProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = (value: number) => Math.round(Number(value || 0)).toLocaleString('es-CO');

  if (!open) return null;

  const getUserId = () => {
    try {
      if (!token) return 1;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.id || 1;
    } catch {
      return 1;
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = getUserId();
      const purchase = await createPurchase({
        userId,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      if (!purchase?.id) {
        throw new Error('No se recibió el ID de la compra');
      }

      const preference = await createPaymentPreference(purchase.id);
      const paymentUrl = preference.checkoutUrl;

      if (!paymentUrl) {
        throw new Error('No se recibió checkoutUrl de Mercado Pago');
      }

      window.location.href = paymentUrl;

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch {
      setError('Error al procesar la orden en el laboratorio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#211F1E]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 w-full max-w-md relative overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Decoración superior estética Innova Diesel */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1A9E53] to-[#2ecc71]" />

        {/* Header del Modal */}
        <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center mt-1">
          <div>
            <span className="text-[10px] font-black text-[#1A9E53] uppercase tracking-[0.3em] block mb-0.5">
              Tu Laboratorio
            </span>
            <h2 className="text-xl font-black text-[#211F1E] uppercase italic tracking-tight">
              CARRITO DE COMPRAS
            </h2>
          </div>
          <button 
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#211F1E] hover:text-white transition-all duration-300 font-sans text-xs"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Cuerpo / Lista de Productos */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 border border-dashed border-gray-200">
                📦
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                El carrito está vacío
              </p>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Añade componentes para iniciar el ensamblaje.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {cart.map(item => (
                <div key={item.productId} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex-grow pr-4">
                    <h4 className="text-sm font-extrabold text-[#211F1E] uppercase tracking-tight line-clamp-1 group-hover:text-[#1A9E53] transition-colors duration-300">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-gray-400 font-bold block mt-0.5">
                      ${formatPrice(item.price)} c/u
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    {/* Controles de Cantidad */}
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-600 font-bold hover:bg-[#211F1E] hover:text-white transition-colors text-xs shadow-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-black text-[#211F1E]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-600 font-bold hover:bg-[#211F1E] hover:text-white transition-colors text-xs shadow-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Precio Total por Item e icono de borrar */}
                    <div className="flex items-center gap-2 min-w-[75px] justify-end">
                      <span className="text-sm font-mono font-black text-[#211F1E]">
                        ${formatPrice(item.price * item.quantity)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.productId)} 
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        title="Eliminar componente"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Modal: Totales y Botón de Checkout */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono block">
                TOTAL ESTIMADO
              </span>
              <span className="text-xs text-gray-400 font-light block">
                Impuestos y soporte incluidos
              </span>
            </div>
            <span className="text-3xl font-mono font-black text-[#1A9E53]">
              ${formatPrice(total)}
            </span>
          </div>

          {/* Alertas de Feedback */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-red-100">
              ⚠️ {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-green-100 flex items-center gap-2 animate-pulse">
              ✅ ¡ORDEN PROCESADA CON ÉXITO!
            </div>
          )}

          {/* Botón de Checkout */}
          <button
            className="w-full bg-[#211F1E] hover:bg-[#1A9E53] text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-black uppercase text-xs italic tracking-widest py-4 px-6 rounded-2xl transition-all duration-500 transform active:scale-[0.98] shadow-md hover:shadow-[0_10px_20px_rgba(26,158,83,0.2)] flex items-center justify-center gap-2"
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading || success}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sincronizando...</span>
              </>
            ) : (
              <span>PROCESAR COMPRA</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartPopup;