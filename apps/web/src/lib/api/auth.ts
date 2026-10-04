// lib/api/auth.ts
import { apiFetch } from "../api-client";
import { LoginInput, SignupInput } from "../schemas/auth";

export const login = (data: LoginInput) =>
  apiFetch<{ accessToken: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const signup = (data: SignupInput) =>
  apiFetch<{ accessToken: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
