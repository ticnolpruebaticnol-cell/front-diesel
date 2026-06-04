import React, { useEffect, useState } from 'react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WhatsappFloat from '../components/public/WhatsappFloat';
import PqrsModal from '../components/public/PqrsModal';
import { createPaymentPreference, getUserPurchases, UserPurchase } from '../services/product';
import { useAuth } from '../context/AuthContext';

const ITEMS_POR_PAGINA = 4;

const Compras: React.FC = () => {
  const [compras, setCompras] = useState<UserPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { token } = useAuth();
  const formatPrice = (value: number) => Math.round(Number(value || 0)).toLocaleString('es-CO');

  const getUserId = () => {
    try {
      if (!token) return 1;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.id || 1;
    } catch {
      return 1;
    }
  };

  const normalizeStatus = (compra: UserPurchase): 'PENDING' | 'PAID' | 'REJECTED' | 'OTHER' => {
    const raw = (compra.status || compra.estado || '').toString().toUpperCase();
    if (raw === 'PENDING' || raw === 'PROCESANDO') return 'PENDING';
    if (raw === 'PAID' || raw === 'COMPLETADO') return 'PAID';
    if (raw === 'REJECTED' || raw === 'RECHAZADO') return 'REJECTED';
    return 'OTHER';
  };

  const statusLabel = (compra: UserPurchase) => {
    const status = normalizeStatus(compra);
    if (status === 'PAID') return 'PAGADO';
    if (status === 'PENDING') return 'PENDIENTE';
    if (status === 'REJECTED') return 'RECHAZADO';
    return compra.status || compra.estado || 'SIN ESTADO';
  };

  const statusClass = (compra: UserPurchase) => {
    const status = normalizeStatus(compra);
    if (status === 'PAID') return 'bg-green-50 text-green-600';
    if (status === 'PENDING') return 'bg-amber-50 text-amber-600';
    if (status === 'REJECTED') return 'bg-red-50 text-red-600';
    return 'bg-blue-50 text-blue-600';
  };

  const fetchPurchases = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const userId = getUserId();
      const data = await getUserPurchases(userId);
      setCompras(data);
    } catch {
      setCompras([]);
      setActionError('No fue posible cargar las compras del usuario.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayWithMercadoPago = async (purchaseId: number) => {
    setPayingId(purchaseId);
    setActionError(null);
    setActionMsg(null);
    try {
      const preference = await createPaymentPreference(purchaseId);
      const paymentUrl = preference.checkoutUrl;
      if (!paymentUrl) throw new Error('No llegó checkoutUrl');
      setActionMsg('Redirigiendo a Mercado Pago para completar el pago...');
      window.location.href = paymentUrl;
    } catch {
      setActionError('No se pudo crear la preferencia de pago en Mercado Pago.');
    } finally {
      setPayingId(null);
    }
  };

  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line
  }, [token]);

  const totalPages = Math.ceil(compras.length / ITEMS_POR_PAGINA);
  const indiceUltimoItem = page * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  const comprasActuales = compras.slice(indicePrimerItem, indiceUltimoItem);

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#211F1E] selection:bg-[#1A9E53] selection:text-white font-sans">
      <Navbar activePage="compras" />
      
      {/* Header Futurista Identitario */}
      <section className="bg-[#211F1E] pt-40 pb-24 relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        {/* Luces de fondo de tu paleta */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1A9E53] opacity-10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#1A9E53] opacity-5 blur-[80px] rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[#1A9E53] font-black text-xs uppercase tracking-[0.5em] mb-4 block">
              Innova Diesel Labs
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
              HISTORIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A9E53] to-[#2ecc71]">
                DE COMPRAS
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl text-sm uppercase tracking-[0.2em] font-light border-l border-[#1A9E53] pl-6">
              Control de componentes adquiridos y estado de rendimiento de tu cuenta.
            </p>
          </div>
        </div>
      </section>

      {/* Listado de Compras con Layout Dinámico */}
      <main className="container mx-auto px-6 pb-24 mt-8 relative z-20">
        {(actionMsg || actionError) && (
          <div className="mb-6">
            {actionMsg && (
              <div className="bg-green-50 text-green-700 border border-green-100 rounded-2xl px-4 py-3 text-sm font-medium">
                {actionMsg}
              </div>
            )}
            {actionError && (
              <div className="bg-red-50 text-red-700 border border-red-100 rounded-2xl px-4 py-3 text-sm font-medium mt-2">
                {actionError}
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1A9E53]"></div>
          </div>
        ) : compras.length === 0 ? (
          <div className="w-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No tienes compras registradas en tu cuenta.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full">
            {comprasActuales.map((compra) => (
              /* CARD DE COMPRA EN HORIZONTAL */
              <div 
                key={compra.id} 
                className="group bg-white rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden w-full"
              >
                {/* Detalle decorativo de fondo */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#1A9E53]/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />

                {/* Bloque Izquierdo: ID de Compra, Metadatos y Productos */}
                <div className="flex-grow z-10 w-full md:max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="px-3 py-0.5 bg-[#211F1E] rounded-full">
                      <span className="text-[9px] font-black text-[#1A9E53] uppercase tracking-tighter">
                        COMPRA #{compra.id}
                      </span>
                    </div>
                    {compra.codigo_transaccion && (
                      <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">
                        {compra.codigo_transaccion}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 font-bold font-mono ml-auto md:ml-0">
                      {compra.fecha || (compra.createdAt ? new Date(compra.createdAt).toLocaleDateString('es-CO') : '')}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${statusClass(compra)}`}>
                      {statusLabel(compra)}
                    </span>
                  </div>

                  {/* Resumen de los productos comprados */}
                  <div className="space-y-1.5 border-t border-gray-50 pt-3">
                    {compra.items && (
                      <ul className="text-xs text-gray-700 font-mono mb-2">
                        {compra.items.map((prod, idx) => {
                          const nombre = prod.product?.Descripcion || prod.product?.["Descripción"] || prod.product?.nombre || `Producto #${prod.productId || prod.id}`;
                          return (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="font-bold">{nombre}</span>
                              <span>x{prod.quantity}</span>
                              <span>${formatPrice(prod.price)}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Bloque Derecho: Total */}
                <div className="flex flex-col items-end z-10 min-w-[120px]">
                  <span className="text-xs text-gray-400 font-bold uppercase mb-1">Total</span>
                  <span className="text-2xl font-black text-[#1A9E53]">${formatPrice(compra.total)}</span>
                  {normalizeStatus(compra) === 'PENDING' && (
                    <button
                      className="mt-3 px-4 py-2 rounded-xl bg-[#009EE3] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 disabled:opacity-60"
                      onClick={() => handlePayWithMercadoPago(compra.id)}
                      disabled={payingId === compra.id}
                    >
                      {payingId === compra.id ? 'Creando pago...' : 'Pagar con Mercado Pago'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Paginación corregida y alineada */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={fetchPurchases}
                className="px-4 h-11 rounded-xl font-mono text-xs font-bold bg-white text-[#211F1E] border border-gray-100 hover:bg-gray-50"
              >
                Actualizar estado
              </button>
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-3 rounded-xl bg-white text-[#211F1E] border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1A9E53] hover:text-white transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-11 h-11 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
                        page === pageNum
                          ? 'bg-[#211F1E] text-[#1A9E53] shadow-md scale-105'
                          : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="p-3 rounded-xl bg-white text-[#211F1E] border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1A9E53] hover:text-white transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <WhatsappFloat />
      <PqrsModal />
    </div>
  );
};

export default Compras;