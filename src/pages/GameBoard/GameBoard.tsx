import { useState, useCallback } from "react"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import Rank from "@/components/AdminDashboard/Left/Rank/Rank"
import Scoreboard from "@/components/AdminDashboard/Mid/Scoreboard/Scoreboard"
import MediaPlayer from "@/components/AdminDashboard/Right/Mediaplayer/MediaPlayer"
import Playlist from "@/components/AdminDashboard/Right/Playlist/Playlist"
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer"
import { useWebRTCMaster } from "@/hooks/useWebRTCMaster"
import { useWebRTCPlayer } from "@/hooks/useWebRTCPlayer"
import type { SpotifyTrack } from "@/services/spotifyService"

const STATUS_LABEL: Record<string, string> = {
  waiting:   '⏳ En attente du maître…',
  connected: '🔗 Connecté — en attente du démarrage',
  playing:   '🔊 Lecture en cours',
}

interface Props {
  role?: 'joueur' | 'maitre'
  gameCode?: string | null
  playlistId?: string | null
}

export default function GameBoard({ role, gameCode, playlistId = null }: Props) {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const { isLoggedIn, isReady, playerState, playTrack, togglePlay } = useSpotifyPlayer()

  const { isCapturing, playerCount, startCapture, triggerSyncStart } =
    useWebRTCMaster(role === 'maitre' ? gameCode ?? null : null)

  const { status } =
    useWebRTCPlayer(role === 'joueur' ? gameCode ?? null : null)

  const handleTrackSelect = useCallback(async (track: SpotifyTrack) => {
    setCurrentTrack(track)
    await playTrack(track.uri)
  }, [playTrack])

  if (role === 'joueur') {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, opacity: 0.6 }}>
          <Typography variant="caption">{STATUS_LABEL[status]}</Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Rank />
        </Box>
      </Box>
    )
  }

  return (
    <div className="board-container">
      <div className="left-container">
        {gameCode && (
          <div style={{ padding: '0.5rem 1rem' }}>
            <Chip
              label={`Code : ${gameCode}`}
              color="success"
              sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.15em', px: 1 }}
            />
          </div>
        )}

        <Box sx={{ px: 1, pb: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {playerCount} joueur{playerCount !== 1 ? 's' : ''} connecté{playerCount !== 1 ? 's' : ''}
          </Typography>

          {!isCapturing ? (
            <Tooltip title="Partage l'audio de cet onglet avec les joueurs. Sélectionne cet onglet et coche «&nbsp;Partager l'audio&nbsp;».">
              <Button variant="outlined" size="small" onClick={startCapture}>
                🎙 Capturer l'audio
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="error"
              disabled={playerCount === 0}
              onClick={triggerSyncStart}
            >
              🔴 Diffuser aux joueurs
            </Button>
          )}
        </Box>

        <Rank />
      </div>
      <div className="mid-container">
        <Scoreboard />
      </div>
      <div className="right-container">
        <MediaPlayer
          currentTrack={currentTrack}
          playerState={playerState}
          onTogglePlay={togglePlay}
          isReady={isReady}
          isLoggedIn={isLoggedIn}
        />
        <Playlist
          playlistId={playlistId}
          currentTrack={currentTrack}
          onTrackSelect={handleTrackSelect}
        />
      </div>
    </div>
  )
}
