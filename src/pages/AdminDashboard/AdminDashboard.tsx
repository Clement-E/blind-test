import { useState, useCallback } from "react"
import AddSpotify from "@/components/AdminDashboard/Left/AddSpotify/AddSpotify"
import AddPlayer from "@/components/AdminDashboard/Left/AddPlayer/AddPlayer"
import Rank from "@/components/AdminDashboard/Left/Rank/Rank"
import Scoreboard from "@/components/AdminDashboard/Mid/Scoreboard/Scoreboard"
import MediaPlayer from "@/components/AdminDashboard/Right/Mediaplayer/MediaPlayer"
import Playlist from "@/components/AdminDashboard/Right/Playlist/Playlist"
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer"
import type { SpotifyTrack } from "@/services/spotifyService"

export default function AdminDashboard() {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const { isLoggedIn, isReady, playerState, playTrack, togglePlay } = useSpotifyPlayer()

  const handleTrackSelect = useCallback(async (track: SpotifyTrack) => {
    setCurrentTrack(track)
    await playTrack(track.uri)
  }, [playTrack])

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
        <MediaPlayer
          currentTrack={currentTrack}
          playerState={playerState}
          onTogglePlay={togglePlay}
          isReady={isReady}
          isLoggedIn={isLoggedIn}
        />
        <Playlist
          playlistId={playlistId}
          currentTrack={currentTrack}
          onTrackSelect={handleTrackSelect}
        />
      </div>
    </div>
  )
}
