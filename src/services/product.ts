import { apiFetch } from './api';

// Obtener compras de un usuario
export interface PurchaseItemProduct {
  Autonumerico?: number;
  Codigo_Producto?: string;
  Descripcion?: string;
  "Descripción"?: string;
  nombre?: string;
}

export interface UserPurchaseItem {
  id?: number;
  productId: number;
  quantity: number;
  price: number;
  product?: PurchaseItemProduct;
}

export interface UserPurchase {
  id: number;
  userId: number;
  codigo_transaccion?: string;
  fecha?: string;
  status?: 'PENDING' | 'PAID' | 'REJECTED' | string;
  estado?: 'Completado' | 'Enviado' | 'Procesando' | string;
  mpPreferenceId?: string | null;
  mpPaymentId?: string | null;
  mpPaymentStatus?: string | null;
  items: UserPurchaseItem[];
  total: number;
  createdAt: string;
}

export async function getUserPurchases(userId: number): Promise<UserPurchase[]> {
  return apiFetch<UserPurchase[]>(`/purchase/user/${userId}`);
}
// --- Compras ---
export interface PurchaseItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface PurchaseRequest {
  userId: number;
  items: PurchaseItem[];
}

export interface PurchaseResponse {
  id: number;
  user?: {
    id: number;
    username?: string;
    email?: string;
  };
  items: UserPurchaseItem[];
  total: number;
  createdAt: string;
  status?: 'PENDING' | 'PAID' | 'REJECTED' | string;
  mpPreferenceId?: string | null;
  mpPaymentId?: string | null;
  mpPaymentStatus?: string | null;
}

export async function createPurchase(data: PurchaseRequest): Promise<PurchaseResponse> {
  return apiFetch<PurchaseResponse>('/purchase', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
}

export interface PaymentPreferenceResponse {
  purchaseId: number;
  preferenceId: string;
  checkoutUrl: string;
  mode?: 'test' | 'prod' | string;
  usesWebhookUrl?: boolean;
  initPoint: string;
  sandboxInitPoint?: string;
  usesRedirectUrls?: boolean;
}

export interface VerifyPurchasePaymentResponse {
  received?: boolean;
  purchaseId: number;
  purchaseStatus: 'PAID' | 'PENDING' | 'REJECTED' | string;
  mpPaymentStatus?: string;
}

export interface PaymentStatusResponse {
  paymentId: number | string;
  status: string;
  statusDetail?: string;
  purchaseId?: number;
  purchaseStatus?: 'PAID' | 'PENDING' | 'REJECTED' | string;
}


// --- Productos ---
export interface Product {
  id?: number;
  codigo?: string;
  nombre?: string;
  cantidad?: number;
  precio?: number;
  categoriaId?: number;
  descripcion?: string;
  ubicacion?: string;
  fechaActualizacion?: string;
  // Campos backend
  Codigo_Producto?: string;
  Descripcion?: string;
  "Descripci\u00f3n"?: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

export async function getProducts(page = 1, pageSize = 25, descripcion = ''): Promise<ProductListResponse> {
  const descParam = descripcion ? `&descripcion=${encodeURIComponent(descripcion)}` : '';
  return apiFetch<ProductListResponse>(`/inventario?page=${page}&pageSize=${pageSize}${descParam}`);
}

// --- Servicios ---
export interface Servicio {
  Autonumerico: number;
  Codigo_Producto: string;
  Descripcion: string;
  "Descripci\u00f3n"?: string;
  Maximo_Permitido?: number;
  Minimo_Permitido?: number;
  Punto_de_Reorden?: number;
  Unidad_de_Medida?: string;
  Precio1?: number;
  Ubicacion?: string | null;
  // ...otros campos opcionales
}

export interface ServicioListResponse {
  data: Servicio[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getServicios(page = 1, pageSize = 10, descripcion = ''): Promise<ServicioListResponse> {
  const descParam = descripcion ? `&descripcion=${encodeURIComponent(descripcion)}` : '';
  return apiFetch<ServicioListResponse>(`/inventario/servicios?page=${page}&pageSize=${pageSize}${descParam}`);
}

export async function createPaymentPreference(purchaseId: number): Promise<PaymentPreferenceResponse> {
  return apiFetch<PaymentPreferenceResponse>('/payment/preference', {
    method: 'POST',
    body: JSON.stringify({ purchaseId }),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function verifyPurchasePayment(purchaseId: number): Promise<VerifyPurchasePaymentResponse> {
  return apiFetch<VerifyPurchasePaymentResponse>(`/payment/verify/purchase/${purchaseId}`);
}

export async function getPaymentStatus(paymentId: number | string): Promise<PaymentStatusResponse> {
  return apiFetch<PaymentStatusResponse>(`/payment/status/${paymentId}`);
}
