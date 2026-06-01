import AddSpotify from "@/components/AdminDashboard/Left/AddSpotify/AddSpotify"
import AddPlayer from "@/components/AdminDashboard/Left/AddPlayer/AddPlayer"
import Rank from "@/components/AdminDashboard/Left/Rank/Rank"
import Scoreboard from "@/components/AdminDashboard/Mid/Scoreboard/Scoreboard"
import MediaPlayer from "@/components/AdminDashboard/Right/Mediaplayer/MediaPlayer"
import Playlist from "@/components/AdminDashboard/Right/Playlist/Playlist"

export default function AdminDashboard() {
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

