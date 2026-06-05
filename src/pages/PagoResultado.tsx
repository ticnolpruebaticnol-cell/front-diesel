import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import WhatsappFloat from '../components/public/WhatsappFloat';
import PqrsModal from '../components/public/PqrsModal';
import { getUserPurchases, verifyPurchasePayment } from '../services/product';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2500;

const PagoResultado: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const { clearCart } = useCart();
  const [attempt, setAttempt] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<string | null>(null);
  const [mpPaymentStatus, setMpPaymentStatus] = useState<string | null>(null);

  const rawStatus =
    (searchParams.get('status') ||
      searchParams.get('collection_status') ||
      searchParams.get('payment_status') ||
      '')
      .toLowerCase()
      .trim();

  const purchaseId = searchParams.get('external_reference') || searchParams.get('purchaseId');
  const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id');
  const purchaseIdNumber = purchaseId ? Number(purchaseId) : NaN;

  const getUserId = () => {
    try {
      if (!token) return 1;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.id || 1;
    } catch {
      return 1;
    }
  };

  const effectiveStatus = useMemo(() => {
    const source = (backendStatus || (verifying ? '' : rawStatus) || '').toUpperCase();
    if (source === 'PAID' || source === 'APPROVED') return 'PAID';
    if (source === 'PENDING' || source === 'IN_PROCESS') return 'PENDING';
    if (source === 'REJECTED' || source === 'FAILURE') return 'REJECTED';
    return 'UNKNOWN';
  }, [backendStatus, rawStatus]);

  const isApproved = effectiveStatus === 'PAID';
  const isPending = effectiveStatus === 'PENDING';

  const title = isApproved
    ? 'Pago aprobado'
    : isPending
      ? 'Pago pendiente'
      : 'Pago no completado';

  const subtitle = verifying
    ? 'Procesando pago y verificando estado real en el servidor...'
    : isApproved
    ? 'Tu compra fue registrada correctamente.'
    : isPending
      ? 'Estamos esperando confirmacion de Mercado Pago.'
      : 'No se pudo confirmar el pago. Puedes intentarlo nuevamente.';

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const verifyAndRefresh = async () => {
    if (!Number.isFinite(purchaseIdNumber)) {
      setVerifyError('No se recibió un purchaseId válido para verificar el pago.');
      return;
    }

    setVerifying(true);
    setVerifyError(null);

    for (let i = 1; i <= MAX_RETRIES; i += 1) {
      setAttempt(i);
      try {
        const verification = await verifyPurchasePayment(purchaseIdNumber);
        const purchaseStatus = (verification.purchaseStatus || '').toUpperCase();
        setBackendStatus(purchaseStatus || null);
        setMpPaymentStatus(verification.mpPaymentStatus || null);

        // Refresca estado de compras del usuario para mantener el frontend sincronizado.
        try {
          const userPurchases = await getUserPurchases(getUserId());
          const updatedPurchase = userPurchases.find(p => p.id === purchaseIdNumber);
          if (updatedPurchase) {
            const fromList = (updatedPurchase.status || updatedPurchase.estado || '').toUpperCase();
            if (fromList) setBackendStatus(fromList);
          }
        } catch {
          // No interrumpe el flujo de verificación principal.
        }

        if (purchaseStatus === 'PAID' || purchaseStatus === 'REJECTED') {
          setVerifying(false);
          return;
        }
      } catch {
        if (i === MAX_RETRIES) {
          setVerifyError('No se pudo verificar el pago con el servidor.');
        }
      }

      if (i < MAX_RETRIES) {
        await wait(RETRY_DELAY_MS);
      }
    }

    setVerifying(false);
  };

  // Limpiar el carrito automáticamente al llegar a esta vista
  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    verifyAndRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseId]);

  const toneClass = isApproved
    ? 'text-green-600 bg-green-50 border-green-100'
    : isPending
      ? 'text-amber-600 bg-amber-50 border-amber-100'
      : 'text-red-600 bg-red-50 border-red-100';

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#211F1E] font-sans">
      <Navbar activePage="compras" />

      <main className="container mx-auto px-6 pt-36 pb-20">
        <section className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
          <span className="text-[#1A9E53] font-black text-xs uppercase tracking-[0.4em] block mb-3">
            Resultado de pago
          </span>

          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight mb-3">
            {title}
          </h1>

          <p className="text-sm text-gray-500 mb-6">{subtitle}</p>

          <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${toneClass}`}>
            Estado actual: {isApproved ? 'aprobado' : isPending ? 'pendiente' : effectiveStatus === 'REJECTED' ? 'rechazado' : 'desconocido'}
          </div>

          <div className="mt-3 text-xs font-mono text-gray-500 space-y-1">
            <div>Estado reportado por retorno: {rawStatus || 'desconocido'}</div>
            {backendStatus && <div>Estado en backend: {backendStatus}</div>}
            {mpPaymentStatus && <div>Estado Mercado Pago: {mpPaymentStatus}</div>}
            {verifying && <div>Verificando intento {attempt} de {MAX_RETRIES}...</div>}
          </div>

          {verifyError && (
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 text-red-600 px-4 py-3 text-sm font-medium">
              {verifyError}
            </div>
          )}

          {purchaseId && (
            <div className="mt-4 text-xs font-mono text-gray-500">
              Referencia de compra: {purchaseId}
            </div>
          )}

          {paymentId && (
            <div className="mt-2 text-xs font-mono text-gray-500">
              Referencia de pago: {paymentId}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={verifyAndRefresh}
              disabled={verifying || !Number.isFinite(purchaseIdNumber)}
              className="px-5 py-3 rounded-2xl bg-[#009EE3] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {verifying ? 'Verificando...' : 'Reintentar verificación'}
            </button>
            <Link
              to="/compras"
              className="px-5 py-3 rounded-2xl bg-[#211F1E] text-white text-xs font-black uppercase tracking-wider hover:bg-[#1A9E53] transition-colors"
            >
              Ir a mis compras
            </Link>
            <Link
              to="/productos"
              className="px-5 py-3 rounded-2xl bg-white border border-gray-200 text-[#211F1E] text-xs font-black uppercase tracking-wider hover:bg-gray-50 transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappFloat />
      <PqrsModal />
    </div>
  );
};

export default PagoResultado;
