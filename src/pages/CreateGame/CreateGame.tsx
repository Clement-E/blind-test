import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useCreateGame } from '@/hooks/useGames'
import { extractPlaylistId } from '@/services/spotifyService'
import { gamesService } from '@/services/gamesService'
import { ROLE_MASTER } from '@/constants/roles'

export default function CreateGame() {
  const [tab, setTab] = useState<0 | 1>(0)
  const navigate = useNavigate()

  // ── Créer une partie ──────────────────────────────────────────────────────
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const { mutate: createGame, isPending: isCreating, error: createError } = useCreateGame()

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const playlistId = extractPlaylistId(url)
    if (!playlistId) {
      setUrlError('URL Spotify invalide')
      return
    }
    setUrlError('')
    createGame(
      { playlist_url: url },
      {
        onSuccess: (game) => {
          sessionStorage.setItem('blindtest_role', ROLE_MASTER)
          sessionStorage.setItem('blindtest_playlistId', playlistId)
          sessionStorage.setItem('blindtest_game_id', game.id)
          void navigate({ to: '/game/$gameId', params: { gameId: game.code } })
        },
      }
    )
  }

  // ── Charger une partie existante ──────────────────────────────────────────
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLoad = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length !== 6) {
      setCodeError('Le code fait 6 chiffres')
      return
    }
    setCodeError('')
    setIsLoading(true)
    try {
      const game = await gamesService.getByCode(code)
      const playlistId = extractPlaylistId(game.playlist_url)
      sessionStorage.setItem('blindtest_role', ROLE_MASTER)
      if (playlistId) sessionStorage.setItem('blindtest_playlistId', playlistId)
      sessionStorage.setItem('blindtest_game_id', game.id)
      void navigate({ to: '/game/$gameId', params: { gameId: game.code } })
    } catch {
      setCodeError('Aucune partie trouvée avec ce code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Maître du jeu
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Nouvelle partie" />
          <Tab label="Charger une partie" />
        </Tabs>

        {tab === 0 && (
          <Box component="form" onSubmit={handleCreate} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="URL de la playlist Spotify"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              error={!!urlError}
              helperText={urlError || 'Ex: https://open.spotify.com/playlist/...'}
              disabled={isCreating}
            />

            {createError && (
              <Typography color="error" variant="body2">
                {createError instanceof Error ? createError.message : 'Erreur lors de la création'}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isCreating || !url}
              sx={{ borderRadius: 3 }}
              startIcon={isCreating ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isCreating ? 'Création...' : 'Créer la partie'}
            </Button>
          </Box>
        )}

        {tab === 1 && (
          <Box component="form" onSubmit={handleLoad} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Code de la partie"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              error={!!codeError}
              helperText={codeError || ' '}
              disabled={isLoading}
              inputProps={{ maxLength: 6, style: { letterSpacing: '0.4em', textAlign: 'center', fontSize: '1.5rem' } }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading || code.length !== 6}
              sx={{ borderRadius: 3 }}
              startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isLoading ? 'Chargement...' : 'Rejoindre la partie'}
            </Button>
          </Box>
        )}

        <Button
          size="small"
          onClick={() => void navigate({ to: '/' })}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          Retour
        </Button>
      </Box>
    </Box>
  )
}
