import { Outlet } from "react-router";
import "src/styles/App.css";

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
