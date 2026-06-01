import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MediaPlayer from '@/components/AdminDashboard/Right/Mediaplayer/MediaPlayer'
import Rank from '@/components/AdminDashboard/Left/Rank/Rank'
import AddSpotify from '@/components/AdminDashboard/Left/AddSpotify/AddSpotify'
import Scoreboard from '@/components/AdminDashboard/Mid/Scoreboard/Scoreboard'
import AddPlayer from '@/components/AdminDashboard/Left/AddPlayer/AddPlayer'
import Playlist from '@/components/AdminDashboard/Right/Playlist/Playlist'
import '@/App.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [playlistId, setPlaylistId] = useState<string | null>(null)

  return (
    <div className="board-container">
      <div className="left-container">
        <AddSpotify onPlaylistChange={setPlaylistId} />
        <AddPlayer />
        <Rank />
      </div>
      <div className="mid-container">
        <Scoreboard />
      </div>
      <div className="right-container">
        <MediaPlayer />
        <Playlist playlistId={playlistId} />
      </div>
    </div>
  )
}

