import "./AddSpotify.css"
import { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { extractPlaylistId } from "@/services/spotifyService"

const theme = createTheme({
  palette: {
    primary: { main: "#c6f145" },
    secondary: { main: "#11cb5f" },
  },
})

interface Props {
  onPlaylistChange:  React.Dispatch<React.SetStateAction<string | null>>
}

function AddSpotify({ onPlaylistChange }: Props) {
  const [url, setUrl] = useState("https://open.spotify.com/playlist/4xcY90gLFqjd7zjXZz1Lpj?si=18b3821592bf4eea")
  const [error, setError] = useState("")

  const handleAdd = () => {
    const id = extractPlaylistId(url)
    if (!id) {
      setError("URL Spotify invalide")
      return
    }
    setError("")
    onPlaylistChange(id)
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
          <Button size="small" variant="contained" onClick={handleAdd}>Add</Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AddSpotify
