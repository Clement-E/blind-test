import "./AddSpotify.css"
import { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import { extractPlaylistId, fetchPlaylistTracks } from "@/services/spotifyService"

const theme = createTheme({
  palette: {
    primary: { main: "#c6f145" },
    secondary: { main: "#11cb5f" },
  },
})

interface Props {
  onPlaylistChange?: (id: string) => void
  onCodeGenerated?: (code: string, playlistId: string) => void
}

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function AddSpotify({ onPlaylistChange, onCodeGenerated }: Props) {
  const [url, setUrl] = useState("https://open.spotify.com/playlist/4xcY90gLFqjd7zjXZz1Lpj?si=18b3821592bf4eea")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async () => {
    const id = extractPlaylistId(url)
    if (!id) {
      setError("URL Spotify invalide")
      return
    }
    setError("")
    setIsLoading(true)
    try {
      await fetchPlaylistTracks(id)
      onPlaylistChange?.(id)
      onCodeGenerated?.(generateCode(), id)
    } catch {
      setError("Impossible de charger la playlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Addspotify-container">
        <p>Add Spotify playlist</p>
        <div className="actions">
          <TextField
            id="standard-basic"
            label="Add spotify url"
            variant="standard"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            size="small"
            variant="contained"
            onClick={handleAdd}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={14} color="inherit" /> : null}
          >
            Add
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AddSpotify
