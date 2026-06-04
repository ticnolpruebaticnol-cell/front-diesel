import { apiFetch } from './api';

export interface AuthResponse {
  access_token: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>(
    '/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }
  );
}

export async function register(username: string, email: string, password: string): Promise<any> {
  return apiFetch<any>(
    '/user/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    }
  );
}
