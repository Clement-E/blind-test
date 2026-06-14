import { createFileRoute } from '@tanstack/react-router'
import GameBoard from '@/pages/GameBoard/GameBoard'

export const Route = createFileRoute('/game/$gameId')({
  component: function Game() {
    const { gameId } = Route.useParams()
    const role = (sessionStorage.getItem('blindtest_role') ?? 'maitre') as 'joueur' | 'maitre'
    const playlistId = role === 'maitre' ? sessionStorage.getItem('blindtest_playlistId') : null

    return (
      <GameBoard
        role={role}
        gameCode={gameId}
        playlistId={playlistId}
      />
    )
  },
})
