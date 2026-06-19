import { createFileRoute } from '@tanstack/react-router'
import GameBoard from '@/pages/GameBoard/GameBoard'
import { ROLE_MASTER, ROLE_PLAYER, type Role } from '@/constants/roles'

export const Route = createFileRoute('/game/$gameId')({
  component: function Game() {
    const { gameId } = Route.useParams()
    const role = (sessionStorage.getItem('blindtest_role') ?? ROLE_MASTER) as Role
    const isMaster = role === ROLE_MASTER
    const playlistId = isMaster ? sessionStorage.getItem('blindtest_playlistId') : null
    const dbGameId = sessionStorage.getItem('blindtest_game_id')

    return (
      <GameBoard
        role={role}
        gameCode={gameId}
        gameId={dbGameId}
        playlistId={playlistId}
      />
    )
  },
})
