import { Outlet } from "react-router";
import "./styles/Reset.css";
import "./styles/Variables.css";
import "./styles/App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(null as User | null);

  return (
    <>
      <Header />
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
      <NavBar />
    </>
  );
}

export default App;
