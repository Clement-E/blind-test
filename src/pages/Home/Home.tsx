import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ROLE_PLAYER, type Role } from '@/constants/roles'
import { gamesService } from '@/services/gamesService'
import { playersService } from '@/services/playersService'

interface PlayerForm {
  code: string
  pseudo: string
  email: string
}

export default function Home() {
  const [role, setRole] = useState<Role | null>(null)
  const [joinError, setJoinError] = useState<string | null>(null)
  const [isJoining, setIsJoining] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerForm>()

  const onJoin = async ({ code, pseudo, email }: PlayerForm) => {
    setJoinError(null)
    setIsJoining(true)
    try {
      const game = await gamesService.getByCode(code)
      const player = await playersService.upsert({ email, username: pseudo })
      await gamesService.addPlayer(game.id, player.id)
      sessionStorage.setItem('blindtest_role', ROLE_PLAYER)
      sessionStorage.setItem('blindtest_game_id', game.id)
      sessionStorage.setItem('blindtest_player_id', player.id)
      void navigate({ to: '/game/$gameId', params: { gameId: code } })
    } catch {
      setJoinError('Code invalide ou partie introuvable')
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        px: 2,
      }}
    >
      <Typography variant="h2" fontWeight={700} textAlign="center">
        🎵 Blind Test
      </Typography>

      {role === null && (
        <>
          <Typography variant="h5" textAlign="center" color="text.secondary">
            Êtes-vous joueur ou maître du jeu ?
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setRole(ROLE_PLAYER)}
              sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: 3 }}
            >
              Je suis joueur
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => void navigate({ to: '/create_game' })}
              sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: 3 }}
            >
              Je suis maître du jeu
            </Button>
          </Box>
        </>
      )}

      {role === ROLE_PLAYER && (
        <Box
          component="form"
          onSubmit={handleSubmit(onJoin)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%', maxWidth: 380 }}
        >
          <Typography variant="h5" textAlign="center" color="text.secondary">
            Rejoindre une partie
          </Typography>

          <TextField
            label="Code de la partie"
            fullWidth
            inputProps={{ maxLength: 6, style: { letterSpacing: '0.4em', textAlign: 'center', fontSize: '1.3rem' } }}
            error={!!errors.code}
            helperText={errors.code?.message}
            {...register('code', {
              required: 'Le code est requis',
              minLength: { value: 6, message: 'Le code fait 6 caractères' },
              maxLength: { value: 6, message: 'Le code fait 6 caractères' },
              setValueAs: (v: string) => v.toUpperCase(),
            })}
          />

          <TextField
            label="Pseudo"
            fullWidth
            error={!!errors.pseudo}
            helperText={errors.pseudo?.message}
            {...register('pseudo', { required: 'Le pseudo est requis' })}
          />

          <TextField
            label="Adresse e-mail"
            fullWidth
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: "L'adresse e-mail est requise",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Adresse e-mail invalide' },
            })}
          />

          {joinError && (
            <Typography color="error" variant="body2" textAlign="center">
              {joinError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isJoining}
            sx={{ borderRadius: 3, mt: 1 }}
            startIcon={isJoining ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {isJoining ? 'Connexion...' : 'Rejoindre la partie'}
          </Button>

          <Button size="small" onClick={() => setRole(null)}>
            Retour
          </Button>
        </Box>
      )}
    </Box>
  )
}
