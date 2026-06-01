import "./AddSpotify.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const theme = createTheme({
  palette: {
    primary: {
      main: "#c6f145",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
})

function AddSpotify() {
  return (
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
  )
}

export default AddSpotify
