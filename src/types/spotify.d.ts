interface SpotifyPlaybackState {
  paused: boolean
  position: number
  duration: number
  track_window: {
    current_track: {
      uri: string
      name: string
      artists: { name: string }[]
      album: { name: string; images: { url: string }[] }
    }
  }
}

declare namespace Spotify {
  class Player {
    constructor(options: {
      name: string
      getOAuthToken: (cb: (token: string) => void) => void
      volume?: number
    })
    addListener(event: 'ready' | 'not_ready', cb: (data: { device_id: string }) => void): void
    addListener(event: 'player_state_changed', cb: (state: SpotifyPlaybackState | null) => void): void
    connect(): Promise<boolean>
    disconnect(): void
    togglePlay(): Promise<void>
  }
}

interface Window {
  Spotify: typeof Spotify
  onSpotifyWebPlaybackSDKReady: () => void
}
