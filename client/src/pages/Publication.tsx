import { useState } from "react";
import "../styles/Publication.css";

function Publication() {
  const [guestInput, setGuestInput] = useState("");
  const [guests, setGuests] = useState<User[]>([]);
  const [error, setError] = useState("");

  const addGuest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/publication?username=${guestInput}`,
      );

      if (response.status === 200) {
        const user = await response.json();

        if (!guests.some((guest) => guest.id === user.id)) {
          setGuests((prev) => [...prev, user]);
          setGuestInput("");
          setError("");
        } else {
          setError("Déjà invité");
        }
      } else if (response.status === 204) {
        setError("Veuillez remplir le champ");
      } else if (response.status === 404) {
        setError("Username inexistant");
      } else if (response.status === 400) {
        setError("Username invalide");
      } else {
        setError("Erreur serveur");
      }
    } catch {
      setError("Impossible de contacter le serveur");
    }
  };

  console.log(guests);

  const removeGuest = (guest: User) => {
    setGuests(guests.filter((g) => g !== guest));
  };

  return (
    <main className="publication-page">
      <div className="guests-section">
        {guests.map((guest) => (
          <div key={guest.id} className="guest-row added-guest">
            <div className="guest-input-display">
              <svg
                className="username-accepted"
                width="22"
                height="22"
                viewBox="0 0 32 32"
              >
                <title>icon profile</title>
                <g id="about">
                  <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />

                  <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
                </g>
              </svg>
              <span>{guest.username}</span>
            </div>
            <button
              type="button"
              className="btn-remove-guest"
              onClick={() => removeGuest(guest)}
              aria-label={`Retirer ${guest}`}
            >
              <img src="./icons/remove.png" alt="" width="20" height="20" />
            </button>
          </div>
        ))}

        <div className="guest-row">
          <div className={`guest-input-display ${error && "error-detected"}`}>
            <svg
              className={`username-accepted ${error && "username-refused"}`}
              width="22"
              height="22"
              viewBox="0 0 32 32"
            >
              <title>icon profile</title>
              <g id="about">
                <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />

                <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
              </g>
            </svg>
            <input
              type="text"
              value={guestInput}
              onFocus={() => setError("")}
              onChange={(e) => setGuestInput(e.target.value)}
              placeholder="Inviter des personnes"
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <button
            type="button"
            className="btn-add-guest"
            onClick={addGuest}
            aria-label="Ajouter une personne"
          >
            <img src="./icons/add.png" alt="" width="20" height="20" />
          </button>
        </div>
      </div>

      <button type="submit" className="btn-publish">
        Publier
      </button>
    </main>
  );
}

export default Publication;
