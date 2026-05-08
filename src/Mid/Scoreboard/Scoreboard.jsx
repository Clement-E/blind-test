import "./Scoreboard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {usePlayers} from "../../hooks/usePlayers.ts";

function Scoreboard() {

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#f5a819",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#a36e0b",
      },
      ternary: {
        // This is green.A700 as hex.
        main: "#2e1e03",
      },
    },
  });


  const { data: players, isLoading, isError } = usePlayers();
  console.log({ players, isLoading, isError });
  console.log("%c 1 --> Line: 28||Scoreboard.jsx\n isLoading: ","color:#f0f;", { players, isLoading, isError });

  return (
    <ThemeProvider theme={theme}>
      <div className="scoreboard-container">
        <p className="scoreboard-title">Scoreboard</p>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
        <div className="scoreboard-player">
          <p className="scoreboard-name">BikiniBandit</p>
          <Button size="small" variant="contained">
            +1
          </Button>
          <Button size="small" color="secondary" variant="contained">
            +1/2
          </Button>
          <Button size="small" color="ternary" variant="contained">
            -1
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Scoreboard;
