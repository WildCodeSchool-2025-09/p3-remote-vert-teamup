import { Outlet } from "react-router";
import "./styles/Reset.css";
import "./styles/Variables.css";
import "./styles/App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

export default App;
