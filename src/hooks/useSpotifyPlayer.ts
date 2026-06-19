import { useState, useEffect, useRef, useCallback } from 'react'
import { getAccessToken } from './useSpotifyAuth'
import { useSpotifyAuth } from '@/contexts/SpotifyAuthContext'

export interface SpotifyPlayerState {
  isPlaying: boolean
  position: number
  duration: number
  trackUri: string | null
}

const initialState: SpotifyPlayerState = {
  isPlaying: false,
  position: 0,
  duration: 0,
  trackUri: null,
}

export function useSpotifyPlayer(onTrackEnd?: () => void) {
  const { isLoggedIn } = useSpotifyAuth()
  const [isReady, setIsReady] = useState(false)
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [playerState, setPlayerState] = useState<SpotifyPlayerState>(initialState)
  const playerRef = useRef<Spotify.Player | null>(null)
  const onTrackEndRef = useRef(onTrackEnd)
  const prevStateRef = useRef<SpotifyPlayerState>(initialState)

  useEffect(() => { onTrackEndRef.current = onTrackEnd }, [onTrackEnd])

  useEffect(() => {
    if (!isLoggedIn) return

    let cancelled = false

    const initPlayer = async () => {
      const token = await getAccessToken()
      if (!token || cancelled) return

      const createPlayer = () => {
        const player = new window.Spotify.Player({
          name: 'Blind Test Player',
          getOAuthToken: async (cb: (t: string) => void) => {
            const t = await getAccessToken()
            if (t) cb(t)
          },
          volume: 0.7,
        })

        player.addListener('ready', ({ device_id }) => {
          setDeviceId(device_id)
          setIsReady(true)
        })

        player.addListener('not_ready', () => setIsReady(false))

        player.addListener('player_state_changed', (state) => {
          if (!state) return
          const prev = prevStateRef.current
          const next: SpotifyPlayerState = {
            isPlaying: !state.paused,
            position: state.position,
            duration: state.duration,
            trackUri: state.track_window.current_track.uri,
          }
          if (prev.isPlaying && state.paused && state.position === 0 && prev.position > 1000) {
            onTrackEndRef.current?.()
          }
          prevStateRef.current = next
          setPlayerState(next)
        })

        player.connect()
        playerRef.current = player
      }

      if (window.Spotify) {
        createPlayer()
      } else {
        window.onSpotifyWebPlaybackSDKReady = createPlayer
      }
    }

    initPlayer()

    return () => {
      cancelled = true
      playerRef.current?.disconnect()
      playerRef.current = null
    }
  }, [isLoggedIn])

  const playTrack = useCallback(async (trackUri: string) => {
    if (!deviceId) return
    const token = await getAccessToken()
    if (!token) return
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [trackUri] }),
    })
  }, [deviceId])

  const togglePlay = useCallback(() => {
    playerRef.current?.togglePlay()
  }, [])

  return { isLoggedIn, isReady, playerState, playTrack, togglePlay }
}
