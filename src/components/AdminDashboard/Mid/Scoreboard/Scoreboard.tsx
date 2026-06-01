import "./Scoreboard.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { usePlayers } from "@/hooks/usePlayers"

declare module "@mui/material/styles" {
  interface Palette {
    ternary: Palette["primary"]
  }
  interface PaletteOptions {
    ternary?: PaletteOptions["primary"]
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ternary: true
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "#f5a819" },
    secondary: { main: "#a36e0b" },
    ternary: { main: "#2e1e03" },
  },
})

function Scoreboard() {
  const { data: players, isLoading, isError } = usePlayers()
  console.log({ players, isLoading, isError })
  console.log("%c 1 --> Line: 28||Scoreboard.tsx\n isLoading: ", "color:#f0f;", { players, isLoading, isError })

  return (
    <ThemeProvider theme={theme}>
      <div className="scoreboard-container">
        <p className="scoreboard-title">Scoreboard</p>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">+1</Button>
          <Button size="small" color="secondary" variant="contained">+1/2</Button>
          <Button size="small" color="ternary" variant="contained">-1</Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Scoreboard
