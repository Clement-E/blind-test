import { apiFetch, jsonBody } from './api'

export type GameStatus = 'waiting' | 'playing' | 'finished'

export type Game = {
  id: string
  code: string
  playlist_url: string
  status: GameStatus
  created_at: string
}

export type GamePlayer = {
  id: string
  email: string
  username: string
  score: number
  joined_at: string
}

export type CreateGameInput = { playlist_url: string; status?: GameStatus }
export type UpdateGameInput = Partial<Pick<Game, 'playlist_url' | 'status'>>

export const gameKeys = {
  all: ['games'] as const,
  detail: (id: string) => ['games', id] as const,
  players: (id: string) => ['games', id, 'players'] as const,
}

export const gamesService = {
  getAll: () =>
    apiFetch<Game[]>('/api/games'),

  getById: (id: string) =>
    apiFetch<Game>(`/api/games/${id}`),

  getByCode: (code: string) =>
    apiFetch<Game>(`/api/games/code/${code}`),

  create: (data: CreateGameInput) =>
    apiFetch<Game>('/api/games', { method: 'POST', ...jsonBody(data) }),

  update: (id: string, data: UpdateGameInput) =>
    apiFetch<Game>(`/api/games/${id}`, { method: 'PUT', ...jsonBody(data) }),

  delete: (id: string) =>
    apiFetch<void>(`/api/games/${id}`, { method: 'DELETE' }),

  // ── game_players ──────────────────────────────────────────────────────────

  getPlayers: (gameId: string) =>
    apiFetch<GamePlayer[]>(`/api/games/${gameId}/players`),

  addPlayer: (gameId: string, playerId: string) =>
    apiFetch(`/api/games/${gameId}/players/${playerId}`, { method: 'POST' }),

  updateScore: (gameId: string, playerId: string, score: number) =>
    apiFetch(`/api/games/${gameId}/players/${playerId}/score`, {
      method: 'PUT',
      ...jsonBody({ score }),
    }),

  removePlayer: (gameId: string, playerId: string) =>
    apiFetch(`/api/games/${gameId}/players/${playerId}`, { method: 'DELETE' }),
}
