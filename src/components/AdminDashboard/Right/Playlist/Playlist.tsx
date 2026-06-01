import "./Playlist.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import IconButton from "@mui/material/Box"
import { PlayArrow } from "@mui/icons-material"
import CircularProgress from "@mui/material/CircularProgress"
import { useSpotifyPlaylist } from "@/hooks/useSpotifyPlaylist"

const theme = createTheme({
  palette: {
    primary: { main: "#8e19d2" },
    secondary: { main: "#641095" },
  },
})

interface Props {
  playlistId: string | null
}

function Playlist({ playlistId }: Props) {
  const { data: tracks, isLoading, isError } = useSpotifyPlaylist(playlistId)

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="playlist-container">
          {isLoading && (
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
              <CircularProgress color="primary" size={24} />
            </div>
          )}
          {isError && (
            <p style={{ color: "red", padding: "0.5rem" }}>Erreur lors du chargement de la playlist.</p>
          )}
          {!playlistId && !isLoading && (
            <p style={{ padding: "0.5rem", opacity: 0.5 }}>Aucune playlist chargée.</p>
          )}
          {tracks?.map((track, index) => (
            <div key={index} className="playlist-item">
              <IconButton>
                <PlayArrow fontSize="small" color="primary" aria-label="play" />
              </IconButton>
              <span className="playlist-item-artiste">{track.album.name}</span>
              <span className="playlist-item-song">{track.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Playlist
