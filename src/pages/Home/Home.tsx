import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddSpotify from '@/components/AdminDashboard/Left/AddSpotify/AddSpotify'
type Role = 'joueur' | 'maitre'

interface PlayerForm {
  code: string
  pseudo: string
  email: string
}

export default function Home() {
  const [role, setRole] = useState<Role | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerForm>()

  const onJoin = ({ code, pseudo, email }: PlayerForm) => {
    sessionStorage.setItem('blindtest_role', 'joueur')
    sessionStorage.setItem('blindtest_player', JSON.stringify({ pseudo, email }))
    void navigate({ to: '/game/$gameId', params: { gameId: code } })
  }

  const handleCodeGenerated = (code: string, playlistId: string) => {
    sessionStorage.setItem('blindtest_playlistId', playlistId)
    void navigate({ to: '/game/$gameId', params: { gameId: code } })
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
              onClick={() => setRole('joueur')}
              sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: 3 }}
            >
              Je suis joueur
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => setRole('maitre')}
              sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: 3 }}
            >
              Je suis maître du jeu
            </Button>
          </Box>
        </>
      )}

      {role === 'maitre' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 480 }}>
          <Typography variant="h5" textAlign="center" color="text.secondary">
            Configurez votre partie
          </Typography>
          <AddSpotify onCodeGenerated={handleCodeGenerated} />
          <Button size="small" onClick={() => setRole(null)}>
            Retour
          </Button>
        </Box>
      )}

      {role === 'joueur' && (
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: 3, mt: 1 }}
          >
            Rejoindre la partie
          </Button>

          <Button size="small" onClick={() => setRole(null)}>
            Retour
          </Button>
        </Box>
      )}
    </Box>
  )
}
