import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createPaymentPreference, createPurchase } from '../../services/product';
// 1. Importamos el componente e inicializador de Mercado Pago
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// 2. Inicializa el SDK con tu Public Key (Cámbiala por tu clave real o usa variables de entorno)
initMercadoPago('APP_USR-a1ff286a-e88c-4f70-ac17-7aae0c11e961');

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
  
  // Nuevo estado para guardar el ID de la preferencia de Mercado Pago
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

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

      if (!purchase?.id && !purchase?.purchaseId) {
        throw new Error('No se recibió el ID de la compra');
      }

      // Tomamos el ID de la compra (ya sea id o purchaseId)
      const pId = purchase.id || purchase.purchaseId;
      const preference = await createPaymentPreference(pId);
      
      // CORRECCIÓN AQUÍ: Tu JSON del backend trae 'preferenceId', no 'id'
      if (!preference?.preferenceId) {
        console.error("Respuesta del backend recibida:", preference); // Para debuggear por si acaso
        throw new Error('No se recibió el preferenceId de Mercado Pago');
      }

      // Guardamos el ID correcto que viene del backend
      setPreferenceId(preference.preferenceId);
      setSuccess(true);
    } catch (err) {
      // Te sugiero imprimir el error real en la consola para que no programes a ciegas
      console.error("Error en el checkout:", err); 
      setError('Error al procesar la orden en el laboratorio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#211F1E]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-100 w-full max-w-md relative overflow-hidden flex flex-col max-h-[85vh]">
        
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1A9E53] to-[#2ecc71]" />

        {/* Header */}
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
            className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#211F1E] hover:text-white transition-all duration-300 text-xs"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Cuerpo / Lista de Productos */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4 custom-scrollbar">
          {cart.length === 0 && !preferenceId ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 border border-dashed border-gray-200">
                📦
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                El carrito está vacío
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {cart.map(item => (
                <div key={item.productId} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex-grow pr-4">
                    <h4 className="text-sm font-extrabold text-[#211F1E] uppercase tracking-tight line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-gray-400 font-bold block mt-0.5">
                      ${formatPrice(item.price)} c/u
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-600 font-bold hover:bg-[#211F1E] hover:text-white text-xs"
                        disabled={!!preferenceId}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-black text-[#211F1E]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-600 font-bold hover:bg-[#211F1E] hover:text-white text-xs"
                        disabled={!!preferenceId}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2 min-w-[75px] justify-end">
                      <span className="text-sm font-mono font-black text-[#211F1E]">
                        ${formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono block">
                TOTAL ESTIMADO
              </span>
            </div>
            <span className="text-3xl font-mono font-black text-[#1A9E53]">
              ${formatPrice(total)}
            </span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-red-100">
              ⚠️ {error}
            </div>
          )}
          
          {success && !preferenceId && (
            <div className="bg-green-50 text-green-600 px-4 py-2.5 rounded-xl text-xs font-mono font-bold border border-green-100">
              ✅ ¡ORDEN PROCESADA CON ÉXITO!
            </div>
          )}

          {/* BOTÓN DINÁMICO: Si ya tenemos el preferenceId, renderiza el Wallet Brick oficial */}
          {preferenceId ? (
            <div className="mt-2 min-h-[48px]">
              <Wallet 
                initialization={{ preferenceId: preferenceId }} 
                customization={{ texts: { valueProp: 'smart_option' } }}
              />
            </div>
          ) : (
            <button
              className="w-full bg-[#211F1E] hover:bg-[#1A9E53] text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-black uppercase text-xs italic tracking-widest py-4 px-6 rounded-2xl transition-all duration-500"
              onClick={handleCheckout}
              disabled={cart.length === 0 || loading}
            >
              {loading ? 'Sincronizando...' : 'PROCESAR COMPRA'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default CartPopup;