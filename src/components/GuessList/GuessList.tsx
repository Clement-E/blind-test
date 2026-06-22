import { useGameGuesses } from '@/hooks/useGames'
import type { GameGuess } from '@/services/gamesService'

interface Props {
  gameId: string
  refetchInterval?: number
}

type TrackGroup = {
  trackName: string
  artistName: string
  players: string[]
}

export default function GuessList({ gameId, refetchInterval }: Props) {
  const { data: guesses = [] } = useGameGuesses(gameId, { refetchInterval })

  if (guesses.length === 0) return null

  const byTrack = guesses.reduce<Record<string, TrackGroup>>((acc, g: GameGuess) => {
    if (!acc[g.track_uri]) {
      acc[g.track_uri] = { trackName: g.track_name, artistName: g.artist_name, players: [] }
    }
    acc[g.track_uri].players.push(g.username)
    return acc
  }, {})

  return (
    <div style={{ padding: '0.75rem 1rem' }}>
      <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '0.85rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Trouvailles
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {Object.entries(byTrack).map(([uri, { trackName, artistName, players }]) => (
          <div key={uri} style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
            <span style={{ fontWeight: 600 }}>{trackName}</span>
            <span style={{ opacity: 0.6 }}> — {artistName}</span>
            <div style={{ marginTop: '0.15rem', opacity: 0.85 }}>
              {players.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
