import { Link } from "react-router";
import "../styles/NavBar.css";

function NavBar() {
  return (
    <>
      {/* <div className="blur-end-page">{""}</div> */}
      <nav className="navbar">
        <Link to="/">Accueil</Link>
        <Link to="/activities/page/1">Explorer</Link>
        <Link to="/publication">publication</Link>
        <Link to="/myactivities">Mes activités</Link>
        <Link to="/profile">Profil</Link>
      </nav>
    </>
  );
}

export default NavBar;
