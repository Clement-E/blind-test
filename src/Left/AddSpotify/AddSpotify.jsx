import "./AddSpotify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddSpotify() {

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#c6f145",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="Addspotify-container">
          <p>Add Spotify playlist</p>
          <div className="actions">
            <TextField
              id="standard-basic"
              label="Add spotify url"
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

export default AddSpotify;
