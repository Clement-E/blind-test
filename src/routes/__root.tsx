import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SpotifyAuthProvider } from '@/contexts/SpotifyAuthContext'

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyAuthProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Outlet />
        </ThemeProvider>
      </SpotifyAuthProvider>
    </QueryClientProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
