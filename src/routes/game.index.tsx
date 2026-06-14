import { createFileRoute } from '@tanstack/react-router'
import GameBoard from '@/pages/GameBoard/GameBoard'

export const Route = createFileRoute('/game/')({
  component: () => <GameBoard role="maitre" />,
})
