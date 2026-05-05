import { apiFetch } from './api';


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
