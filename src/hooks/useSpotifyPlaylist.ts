import { useQuery } from '@tanstack/react-query'
import { fetchPlaylistTracks } from '@/services/spotifyService'

export const useSpotifyPlaylist = (playlistId: string | null) =>
  useQuery({
    queryKey: ['spotify', 'playlist', playlistId],
    queryFn: () => fetchPlaylistTracks(playlistId!),
    enabled: !!playlistId,
  })
