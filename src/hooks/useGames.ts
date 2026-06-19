import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gamesService, gameKeys, type CreateGameInput, type UpdateGameInput } from '@/services/gamesService'

export const useGames = () =>
  useQuery({
    queryKey: gameKeys.all,
    queryFn: gamesService.getAll,
  })

export const useGame = (id: string) =>
  useQuery({
    queryKey: gameKeys.detail(id),
    queryFn: () => gamesService.getById(id),
    enabled: !!id,
  })

export const useCreateGame = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateGameInput) => gamesService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: gameKeys.all }),
  })
}

export const useUpdateGame = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGameInput }) =>
      gamesService.update(id, data),
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: gameKeys.all })
      qc.invalidateQueries({ queryKey: gameKeys.detail(id) })
    },
  })
}

export const useDeleteGame = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => gamesService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: gameKeys.all }),
  })
}

// ── game_players ──────────────────────────────────────────────────────────────

export const useGamePlayers = (gameId: string, options?: { refetchInterval?: number }) =>
  useQuery({
    queryKey: gameKeys.players(gameId),
    queryFn: () => gamesService.getPlayers(gameId),
    enabled: !!gameId,
    refetchInterval: options?.refetchInterval,
  })

export const useAddGamePlayer = (gameId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (playerId: string) => gamesService.addPlayer(gameId, playerId),
    onSuccess: () => qc.invalidateQueries({ queryKey: gameKeys.players(gameId) }),
  })
}

export const useUpdateScore = (gameId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ playerId, score }: { playerId: string; score: number }) =>
      gamesService.updateScore(gameId, playerId, score),
    onSuccess: () => qc.invalidateQueries({ queryKey: gameKeys.players(gameId) }),
  })
}

export const useRemoveGamePlayer = (gameId: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (playerId: string) => gamesService.removePlayer(gameId, playerId),
    onSuccess: () => qc.invalidateQueries({ queryKey: gameKeys.players(gameId) }),
  })
}
