// Centraliza las requests HTTP
// export const API_BASE_URL = 'https://api.innovapruebas.site';
export const API_BASE_URL = 'http://localhost:5005';

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
