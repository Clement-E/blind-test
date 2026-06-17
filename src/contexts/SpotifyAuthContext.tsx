import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { isAuthenticated, handleOAuthCallback } from '@/hooks/useSpotifyAuth'

interface SpotifyAuthContextValue {
  isLoggedIn: boolean
}

const SpotifyAuthContext = createContext<SpotifyAuthContextValue>({ isLoggedIn: false })

export function SpotifyAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
  const navigate = useNavigate()

  useEffect(() => {
    handleOAuthCallback().then(wasCallback => {
      if (!wasCallback) return
      setIsLoggedIn(true)
      const redirectBack = sessionStorage.getItem('spotify_redirect_back')
      sessionStorage.removeItem('spotify_redirect_back')
      if (redirectBack && redirectBack !== '/') {
        navigate({ to: redirectBack })
      }
    })
  }, [])

  return (
    <SpotifyAuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </SpotifyAuthContext.Provider>
  )
}

export const useSpotifyAuth = () => useContext(SpotifyAuthContext)
