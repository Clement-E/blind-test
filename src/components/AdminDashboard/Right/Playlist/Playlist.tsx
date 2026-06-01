import "./Playlist.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import IconButton from "@mui/material/Box"
import { PlayArrow } from "@mui/icons-material"

const theme = createTheme({
  palette: {
    primary: {
      main: "#8e19d2",
    },
    secondary: {
      main: "#641095",
    },
  },
})

function Playlist() {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="playlist-container">
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
          <div className="playlist-item playlist-item-current">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow fontSize="small" color="primary" aria-label="play" />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">Mellon collie and the infinite sadness</span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Playlist
