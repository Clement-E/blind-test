import { createFileRoute } from '@tanstack/react-router'
import MediaPlayer from '../Right/Mediaplayer/MediaPlayer'
import Rank from '../Left/Rank/Rank'
import AddSpotify from '../Left/AddSpotify/AddSpotify'
import Scoreboard from '../Mid/Scoreboard/Scoreboard'
import AddPlayer from '../Left/AddPlayer/AddPlayer'
import Playlist from '../Right/Playlist/Playlist'
import '../App.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="board-container">
      <div className="left-container">
        <AddSpotify />
        <AddPlayer />
        <Rank />
      </div>
      <div className="mid-container">
        <Scoreboard />
      </div>
      <div className="right-container">
        <MediaPlayer />
        <Playlist />
      </div>
    </div>
  )
}
