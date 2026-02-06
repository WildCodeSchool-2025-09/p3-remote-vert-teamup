import { Outlet } from "react-router";
import "./styles/Reset.css";
import "./styles/Variables.css";
import "./styles/App.css";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./theme/muiTheme";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Header />
      <ThemeProvider theme={muiTheme}>
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
      <NavBar />
    </>
  );
}

export default App;
