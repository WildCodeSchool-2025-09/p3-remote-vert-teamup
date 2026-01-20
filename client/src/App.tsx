import { Outlet } from "react-router";
import "./styles/Reset.css";
import "./styles/Variables.css";
import "./styles/App.css";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
