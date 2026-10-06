// lib/api/clients.ts
import { apiFetch } from "../api-client";
import { ClientInput, Client } from "../schemas/clients";

export const clientsApi = {
  getAll: () => apiFetch<Client[]>("/clients"),
  create: (data: ClientInput) =>
    apiFetch<Client>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<ClientInput>) =>
    apiFetch<Client>(`/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiFetch<void>(`/clients/${id}`, { method: "DELETE" }),
};
