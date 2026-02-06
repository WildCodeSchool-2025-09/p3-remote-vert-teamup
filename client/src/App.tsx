import { Outlet } from "react-router";
import "./styles/Reset.css";
import "./styles/Variables.css";
import "./styles/App.css";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/muiTheme";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
