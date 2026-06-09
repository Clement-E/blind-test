const API_URL = import.meta.env.VITE_API_URL

export interface SpotifyTrack {
  id: string
  uri: string
  name: string
  duration_ms: number
  artists: { name: string }[]
  album: {
    name: string
    release_date?: string
    images?: { url: string }[]
  }
}

export function extractPlaylistId(url: string): string | null {
  const match = url.match(/playlist\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

export async function fetchPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
  const res = await fetch(`${API_URL}/api/spotify/playlist/${playlistId}`)
  if (!res.ok) throw new Error('Erreur lors de la récupération de la playlist')
  const data = await res.json()
  return data.items
    .map((item: { track: SpotifyTrack | null }) => item.track)
    .filter(Boolean)
}
