import "./MediaPlayer.css"
import IconButton from "@mui/material/Box"
import Button from "@mui/material/Button"
import placeholder from "@/assets/placeholder.png"
import {
  SkipPreviousRounded,
  SkipNextRounded,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@mui/icons-material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"
import { initiateSpotifyLogin } from "@/hooks/useSpotifyAuth"
import type { SpotifyTrack } from "@/services/spotifyService"
import type { SpotifyPlayerState } from "@/hooks/useSpotifyPlayer"

const theme = createTheme({
  palette: {
    primary: { main: "#f426a8" },
    secondary: { main: "#6c134b" },
  },
})

interface Props {
  currentTrack: SpotifyTrack | null
  playerState: SpotifyPlayerState
  onTogglePlay: () => void
  onPrevious: () => void
  onNext: () => void
  isReady: boolean
  isLoggedIn: boolean
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

function MediaPlayer({ currentTrack, playerState, onTogglePlay, onPrevious, onNext, isReady, isLoggedIn }: Props) {
  const [displayPosition, setDisplayPosition] = useState(0)

  useEffect(() => {
    setDisplayPosition(playerState.position)
  }, [playerState.position])

  useEffect(() => {
    if (!playerState.isPlaying) return
    const startTs = Date.now()
    const startPos = playerState.position
    const interval = setInterval(() => {
      setDisplayPosition(startPos + (Date.now() - startTs))
    }, 500)
    return () => clearInterval(interval)
  }, [playerState.isPlaying, playerState.position])

  const coverUrl = currentTrack?.album?.images?.[0]?.url
  const year = currentTrack?.album?.release_date?.slice(0, 4) ?? "—"

  return (
    <ThemeProvider theme={theme}>
      <div className="mp-container">
        <div className="mp-pochette">
          <img src={coverUrl ?? placeholder} alt="" />
          <div className="mp-timer">{formatTime(displayPosition)}</div>
        </div>

        {!isLoggedIn ? (
          <div className="mp-actions">
            <Button
              variant="outlined"
              size="small"
              onClick={initiateSpotifyLogin}
              sx={{ color: "#f426a8", borderColor: "#f426a8", fontSize: "10px", mt: 1 }}
            >
              Connect Spotify
            </Button>
          </div>
        ) : (
          <div className="mp-actions">
            <IconButton onClick={onPrevious}>
              <SkipPreviousRounded fontSize="large" color="primary" aria-label="previous" />
            </IconButton>
            <IconButton
              onClick={onTogglePlay}
              style={{ opacity: isReady ? 1 : 0.4, cursor: isReady ? "pointer" : "default" }}
            >
              {playerState.isPlaying ? (
                <PauseCircleFilled fontSize="large" color="primary" aria-label="pause" />
              ) : (
                <PlayCircleFilled fontSize="large" color="primary" aria-label="play" />
              )}
            </IconButton>
            <IconButton onClick={onNext}>
              <SkipNextRounded fontSize="large" color="primary" aria-label="next" />
            </IconButton>
          </div>
        )}

        <div className="mp-infos">
          <dl>
            <dt>Artiste:</dt>
            <dd>{currentTrack?.artists?.[0]?.name ?? "—"}</dd>
          </dl>
          <dl>
            <dt>Track:</dt>
            <dd>{currentTrack?.name ?? "—"}</dd>
          </dl>
          <dl>
            <dt>Année:</dt>
            <dd>{year}</dd>
          </dl>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default MediaPlayer
