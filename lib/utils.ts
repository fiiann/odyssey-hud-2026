import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateMockToken(email: string): string {
  const payload = {
    user_id: 'mock-user-1',
    email,
    exp: Date.now() + 3600000, // 1 hour expiration
    iat: Date.now(),
  };
  return btoa(JSON.stringify(payload));
}

export function parseToken(token: string): { user_id: string; email: string; exp: number } | null {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseToken(token);
  if (!payload) return true;
  return Date.now() > payload.exp;
}
