import "./MediaPlayer.css";
import IconButton from "@mui/material/Box";
import placeholder from "../../assets/placeholder.png"
import {
  SkipPreviousRounded,
  SkipNextRounded,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';


function MediaPlayer() {

  const [isPlaying, setIsPlaying] = useState(true)
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#f426a8",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#6c134b",
      },
    },
  });

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="mp-container">
        <div className="mp-pochette">
          <img src={placeholder} alt="" />
          <div className="mp-timer">01:23</div>
        </div>
        <div className="mp-actions">
          <IconButton>
            <SkipPreviousRounded
              fontSize="large"
              variant="contained"
              color="primary"
              aria-label="next"
            />
          </IconButton>
          <IconButton onClick={handlePlayClick}>
            {isPlaying ? (
              <PlayCircleFilled
                fontSize="large"
                color="primary"
                aria-label="play"
                variant="outlined"
              />
            ) : (
              <PauseCircleFilled
                fontSize="large"
                color="primary"
                aria-label="play"
                variant="contained"
              />
            )}
          </IconButton>
          <IconButton>
            <SkipNextRounded
              fontSize="large"
              variant="contained"
              color="primary"
              aria-label="next"
            />
          </IconButton>
        </div>
        <div className="mp-infos">
          <dl>
            <dt>Artiste:</dt>
            <dd>The Strokes</dd>
          </dl>
          <dl>
            <dt>Track:</dt>
            <dd>Selfless</dd>
          </dl>
          <dl>
            <dt>Année:</dt>
            <dd>2021</dd>
          </dl>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MediaPlayer;
