import {useState, useCallback, useEffect, useRef} from "react"
import { useQueryClient } from "@tanstack/react-query"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Rank from "@/components/AdminDashboard/Left/Rank/Rank"
import Scoreboard from "@/components/AdminDashboard/Mid/Scoreboard/Scoreboard"
import GuessList from "@/components/GuessList/GuessList"
import MediaPlayer from "@/components/AdminDashboard/Right/Mediaplayer/MediaPlayer"
import Playlist from "@/components/AdminDashboard/Right/Playlist/Playlist"
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer"
import { useSpotifyPlaylist } from "@/hooks/useSpotifyPlaylist"
import { useWebRTCMaster } from "@/hooks/useWebRTCMaster"
import { useWebRTCPlayer } from "@/hooks/useWebRTCPlayer"
import { useGamePlayers } from "@/hooks/useGames"
import { gameKeys } from "@/services/gamesService"
import type { SpotifyTrack } from "@/services/spotifyService"
import { ROLE_MASTER, ROLE_PLAYER, type Role } from "@/constants/roles"

const STATUS_LABEL: Record<string, string> = {
  waiting:   '⏳ En attente du maître…',
  connected: '🔗 Connecté — en attente du démarrage',
  playing:   '🔊 Lecture en cours',
}

interface Props {
  role?: Role
  gameCode?: string | null
  gameId?: string | null
  playlistId?: string | null
}

export default function GameBoard({ role, gameCode, gameId, playlistId = null }: Props) {
  const isMaster = role === ROLE_MASTER
  const isPlayer = role === ROLE_PLAYER

  const qc = useQueryClient()
  const { data: players = [] } = useGamePlayers(gameId ?? '', { refetchInterval: isMaster? 30_000 : 3_000 })

  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [captureModalOpen, setCaptureModalOpen] = useState(false)

  const { data: tracks = [] } = useSpotifyPlaylist(playlistId)

  // Ref pour casser la dépendance circulaire navigateTrack ↔ useSpotifyPlayer
  const onTrackEndRef = useRef<() => void>()
  const { isLoggedIn, isReady, playerState, playTrack, togglePlay } = useSpotifyPlayer(
    useCallback(() => onTrackEndRef.current?.(), [])
  )

  const navigateTrack = useCallback((delta: 1 | -1) => {
    if (!tracks.length) return
    const idx = tracks.findIndex(t => t.uri === currentTrack?.uri)
    const next = tracks[idx + delta]
    if (next) {
      setCurrentTrack(next)
      void playTrack(next.uri)
    }
  }, [tracks, currentTrack, playTrack])

  useEffect(() => { onTrackEndRef.current = () => navigateTrack(1) }, [navigateTrack])

  const { isCapturing, playerCount, playerEventCount, connectedDbPlayerIds, startCapture, stopCapture, triggerSyncStart } =
    useWebRTCMaster(isMaster ? gameCode ?? null : null)

  useEffect(() => {
    if (isMaster) setCaptureModalOpen(true)
  }, [isMaster])

  useEffect(() => {
    if (!gameId || playerEventCount === 0) return
    void qc.invalidateQueries({ queryKey: gameKeys.players(gameId) })
  }, [playerEventCount, gameId, qc])

  useEffect(() => {
    if (isCapturing) setCaptureModalOpen(false)
  }, [isCapturing])

  const { status, audioUnlocked, resumeAudio } =
    useWebRTCPlayer(isPlayer ? gameCode ?? null : null)

  const handleTrackSelect = useCallback(async (track: SpotifyTrack) => {
    setCurrentTrack(track)
    await playTrack(track.uri)
  }, [playTrack])

  if (isPlayer) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
          <Box>
            {!audioUnlocked && (
              <Button variant="contained" size="small" onClick={resumeAudio}>
                🔊 Autoriser la diffusion
              </Button>
            )}
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.6 }}>{STATUS_LABEL[status]}</Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Rank players={players} />
          {gameId && <GuessList gameId={gameId} refetchInterval={5_000} />}
        </Box>
      </Box>
    )
  }

  return (
    <>
    <Dialog open={captureModalOpen} onClose={() => setCaptureModalOpen(false)}>
      <DialogTitle>Partager l'audio de cet onglet</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Pour diffuser la musique aux joueurs, tu dois partager l'audio de cet onglet.
          <br /><br />
          Dans la boîte de dialogue qui va s'ouvrir : sélectionne <strong>cet onglet</strong> et coche <strong>"Partager l'audio"</strong>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCaptureModalOpen(false)} color="inherit">Plus tard</Button>
        <Button
          variant="contained"
          onClick={async () => {
            await startCapture()
            setCaptureModalOpen(false)
          }}
        >
          Partager l'audio
        </Button>
      </DialogActions>
    </Dialog>

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
            <>
              <Button
                variant="contained"
                size="small"
                color="error"
                disabled={playerCount === 0}
                onClick={triggerSyncStart}
              >
                🔴 Diffuser aux joueurs
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={stopCapture}
              >
                ⏹ Arrêter la diffusion
              </Button>
            </>
          )}
        </Box>

        <Rank players={players} connectedPlayerIds={connectedDbPlayerIds} />
        {gameId && <GuessList gameId={gameId} />}
      </div>
      <div className="mid-container">
        {gameId && <Scoreboard players={players} gameId={gameId} currentTrack={currentTrack} />}
      </div>
      <div className="right-container">
        <MediaPlayer
          currentTrack={currentTrack}
          playerState={playerState}
          onTogglePlay={togglePlay}
          onPrevious={() => navigateTrack(-1)}
          onNext={() => navigateTrack(1)}
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
    </>
  )
}
