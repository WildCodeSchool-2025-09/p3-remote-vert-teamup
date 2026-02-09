import { Outlet } from "react-router";
import "./styles/Reset.css";
import "./styles/Variables.css";
import "./styles/App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

export default App;
