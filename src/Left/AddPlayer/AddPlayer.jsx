import "./AddPlayer.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddPlayer() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3ad1f7",
      },
      secondary: {
        main: "#e7ebec",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="Addplayer-container">
          <p>Here comes a new chalenger</p>
          <div className="actions">
            <TextField
              id="standard-basic"
              label="Your name sir please"
              variant="standard"
              fullWidth
            />
            <Button size="small" variant="contained">Add</Button>
          </div>
        </div>
      </ThemeProvider>
    </>
  );

}

export default AddPlayer;
