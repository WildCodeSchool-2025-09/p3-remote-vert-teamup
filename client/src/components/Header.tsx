import "../styles/Header.css";

function Header() {
  return (
    <header>
      <div>
        <p>Bonjour</p>
        <p>User</p>
      </div>
      <div className="btn-chat">
        <img src="/icons/message.png" alt="icon message" />
      </div>
    </header>
  );
}

export default Header;
