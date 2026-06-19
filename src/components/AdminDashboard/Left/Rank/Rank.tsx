import "./Rank.css"
import type { GamePlayer } from "@/services/gamesService"

interface Props {
  players: GamePlayer[]
}

function Rank({ players }: Props) {
  return (
    <div className="rank-container">
      <p className="rank-title">Leaderboard</p>
      {players.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.85rem' }}>
          En attente de joueurs…
        </p>
      )}
      {players.map((player, index) => (
        <div key={player.id} className="player">
          <p className="player-rank">{index + 1}</p>
          <p className="player-name">{player.username}</p>
          <p className="player-points">{Number(player.score)}</p>
        </div>
      ))}
    </div>
  )
}

export default Rank
