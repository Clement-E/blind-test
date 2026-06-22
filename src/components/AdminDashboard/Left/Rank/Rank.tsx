import "./Rank.css"
import type { GamePlayer } from "@/services/gamesService"

interface Props {
  players: GamePlayer[]
  connectedPlayerIds?: Set<string>
}

function Rank({ players, connectedPlayerIds }: Props) {
  return (
    <div className="rank-container">
      <p className="rank-title">Leaderboard</p>
      {players.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.85rem' }}>
          En attente de joueurs…
        </p>
      )}
      {players.map((player, index) => {
        const isConnected = !connectedPlayerIds || connectedPlayerIds.has(player.id)
        return (
          <div key={player.id} className="player">
            <p className="player-rank">{index + 1}</p>
            {connectedPlayerIds && (
              <span
                title={isConnected ? 'Connecté' : 'Déconnecté'}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  flexShrink: 0,
                  backgroundColor: isConnected ? '#4caf50' : '#757575',
                }}
              />
            )}
            <p className="player-name" style={{ opacity: isConnected ? 1 : 0.45 }}>
              {player.username}
            </p>
            <p className="player-points">{Number(player.score)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Rank
