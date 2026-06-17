import { apiFetch, jsonBody } from './api'

export type Player = {
  id: string
  email: string
  username: string
  created_at: string
}

export type CreatePlayerInput = Pick<Player, 'email' | 'username'>
export type UpdatePlayerInput = Partial<CreatePlayerInput>

export const playerKeys = {
  all: ['players'] as const,
  detail: (id: string) => ['players', id] as const,
}

export const playersService = {
  getAll: () =>
    apiFetch<Player[]>('/api/players'),

  getById: (id: string) =>
    apiFetch<Player>(`/api/players/${id}`),

  create: (data: CreatePlayerInput) =>
    apiFetch<Player>('/api/players', { method: 'POST', ...jsonBody(data) }),

  update: (id: string, data: UpdatePlayerInput) =>
    apiFetch<Player>(`/api/players/${id}`, { method: 'PUT', ...jsonBody(data) }),

  delete: (id: string) =>
    apiFetch<void>(`/api/players/${id}`, { method: 'DELETE' }),
}
