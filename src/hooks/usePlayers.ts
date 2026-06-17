import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { playersService, playerKeys, type UpdatePlayerInput, type CreatePlayerInput } from '@/services/playersService'

export const usePlayers = () =>
  useQuery({
    queryKey: playerKeys.all,
    queryFn: playersService.getAll,
  })

export const usePlayer = (id: string) =>
  useQuery({
    queryKey: playerKeys.detail(id),
    queryFn: () => playersService.getById(id),
    enabled: !!id,
  })

export const useCreatePlayer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePlayerInput) => playersService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: playerKeys.all }),
  })
}

export const useUpdatePlayer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlayerInput }) =>
      playersService.update(id, data),
    onSuccess: (_res, { id }) => {
      qc.invalidateQueries({ queryKey: playerKeys.all })
      qc.invalidateQueries({ queryKey: playerKeys.detail(id) })
    },
  })
}

export const useDeletePlayer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => playersService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: playerKeys.all }),
  })
}
