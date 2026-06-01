import { createFileRoute } from '@tanstack/react-router'
import CreateGame from '@/pages/CreateGame/CreateGame'

export const Route = createFileRoute('/create_game')({
  component: CreateGame,
})
