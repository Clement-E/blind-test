import "./Playlist.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/Box";
import {
  PlayArrow,
  PlayCircleFilled,
} from "@mui/icons-material";

function Playlist() {

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#8e19d2",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#641095",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="playlist-container">
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
          <div className="playlist-item playlist-item-current">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The cure</span>
            <span className="playlist-item-song">Boys don't cry</span>
          </div>
          <div className="playlist-item">
            <IconButton>
              <PlayArrow
                fontSize="small"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            </IconButton>
            <span className="playlist-item-artiste">The smashing pumpkins</span>
            <span className="playlist-item-song">
              Mellon collie and the infinite sadness
            </span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Playlist;
