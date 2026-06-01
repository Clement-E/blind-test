import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playersService, playerKeys, type Player } from '@/services/playersService';

// GET tous les joueurs
export const usePlayers = () =>
  useQuery({
    queryKey: playerKeys.all,
    queryFn: playersService.getAll,
  });

// GET un joueur
export const usePlayer = (id: string) =>
  useQuery({
    queryKey: playerKeys.detail(id),
    queryFn: () => playersService.getById(id),
    enabled: !!id,
  });

// POST
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: playersService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: playerKeys.all }),
  });
};

// PUT
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) =>
      playersService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: playerKeys.all }),
  });
};

// DELETE
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: playersService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: playerKeys.all }),
  });
};