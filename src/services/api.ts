// Centraliza las requests HTTP
//haz que se ocupe del .env para la URL base y que tenga un timeout por defecto
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.innovapruebas.site';
// export const API_BASE_URL = 'http://localhost:5005';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}
