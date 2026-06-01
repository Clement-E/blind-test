import './App.css'
import MediaPlayer from './Right/Mediaplayer/MediaPlayer'
import Rank from './Left/Rank/Rank'
import AddSpotify from "./Left/AddSpotify/AddSpotify"
import Scoreboard from "./Mid/Scoreboard/Scoreboard"
import AddPlayer from "./Left/AddPlayer/AddPlayer"
import Playlist from "./Right/Playlist/Playlist"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
