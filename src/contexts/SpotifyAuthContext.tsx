import { createContext, useContext, useState, useEffect } from 'react'
import { isAuthenticated, handleOAuthCallback } from '@/hooks/useSpotifyAuth'

interface SpotifyAuthContextValue {
  isLoggedIn: boolean
}

const SpotifyAuthContext = createContext<SpotifyAuthContextValue>({ isLoggedIn: false })

export function SpotifyAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())

  useEffect(() => {
    handleOAuthCallback().then(wasCallback => {
      if (wasCallback) setIsLoggedIn(true)
    })
  }, [])

  return (
    <SpotifyAuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </SpotifyAuthContext.Provider>
  )
}

export const useSpotifyAuth = () => useContext(SpotifyAuthContext)
