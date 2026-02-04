import "../styles/Header.css";

function Header() {
  return (
    <header className="header-navbar">
      <div>
        <p>Bonjour</p>
        <p>User</p>
      </div>
      <img src="/logo.png" alt="logo team up" />
      <div className="btn-chat">
        <img src="/icons/message.png" alt="icon message" />
      </div>
    </header>
  );
}

export default Header;
