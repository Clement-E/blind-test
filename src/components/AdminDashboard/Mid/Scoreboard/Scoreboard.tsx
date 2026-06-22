import "./Scoreboard.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { useUpdateScore, useAddGuess } from "@/hooks/useGames"
import type { GamePlayer } from "@/services/gamesService"
import type { SpotifyTrack } from "@/services/spotifyService"

declare module "@mui/material/styles" {
  interface Palette {
    ternary: Palette["primary"]
  }
  interface PaletteOptions {
    ternary?: PaletteOptions["primary"]
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ternary: true
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "#f5a819" },
    secondary: { main: "#a36e0b" },
    ternary: { main: "#2e1e03" },
  },
})

interface Props {
  players: GamePlayer[]
  gameId: string
  currentTrack: SpotifyTrack | null
}

function Scoreboard({ players, gameId, currentTrack }: Props) {
  const { mutate: updateScore } = useUpdateScore(gameId)
  const { mutate: addGuess } = useAddGuess(gameId)

  const adjust = (player: GamePlayer, delta: number) => {
    updateScore({ playerId: player.id, score: Math.max(0, Number(player.score) + delta) })
  }

  const foundIt = (player: GamePlayer) => {
    updateScore({ playerId: player.id, score: Number(player.score) + 1 })
    addGuess({
      player_id: player.id,
      track_uri: currentTrack!.uri,
      track_name: currentTrack!.name,
      artist_name: currentTrack!.artists.map(a => a.name).join(', '),
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="scoreboard-container">
        <p className="scoreboard-title">Scoreboard</p>
        {players.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.85rem' }}>
            En attente de joueurs…
          </p>
        )}
        {players.map((player) => (
          <div key={player.id} className="scoreboard-player">
            <p className="scoreboard-name">{player.username}</p>
            <Button
              size="small"
              variant="contained"
              color="success"
              disabled={!currentTrack}
              onClick={() => foundIt(player)}
            >
              Found it!
            </Button>
            <Button size="small" variant="contained" onClick={() => adjust(player, 1)}>+1</Button>
            <Button size="small" color="secondary" variant="contained" onClick={() => adjust(player, 0.5)}>+1/2</Button>
            <Button size="small" color="ternary" variant="contained" onClick={() => adjust(player, -1)}>-1</Button>
          </div>
        ))}
      </div>
    </ThemeProvider>
  )
}

export default Scoreboard
