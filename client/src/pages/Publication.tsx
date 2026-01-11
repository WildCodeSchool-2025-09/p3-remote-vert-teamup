import { useEffect, useRef, useState } from "react";
import "../styles/variables.css";
import "../styles/Publication.css";
import CalenderIcon from "../assets/Icons/CalenderIcon.svg";
import ClockIcon from "../assets/Icons/ClockIcon.svg";
import DurationIcon from "../assets/Icons/DurationIcon.svg";
import LocationIcon from "../assets/Icons/LocationIcon.svg";
import PeopleIcon from "../assets/Icons/PeopleIcon.svg";
import PriceIcon from "../assets/Icons/PriceIcon.svg";
import SearchIcon from "../assets/Icons/SearchIcon.svg";

type Sport = {
  id: number;
  name: string;
};

function Publication() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [sportId, setSportId] = useState("");
  const [sportSearch, setSportSearch] = useState("");
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [nbPlaces, setNbPlaces] = useState("");
  const [description, setDescription] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [autoValidation, setAutoValidation] = useState(false);
  const [guestInput, setGuestInput] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [locker, setLocker] = useState(false);
  const [shower, setShower] = useState(false);
  const [toilet, setToilet] = useState(false);
  const [airConditioning, setAirConditioning] = useState(false);
  const [level, setLevel] = useState<
    "begginer" | "amateur" | "advance" | "All"
  >("All");
  const [handisport, setHandisport] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/sports")
      .then((res) => res.json())
      .then((data) => setSports(data))
      .catch(() => setError("Impossible de charger les sports"));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(e.target as Node)
      ) {
        setShowSportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(sportSearch.toLowerCase()),
  );

  const handleSelectSport = (sport: Sport) => {
    setSportId(String(sport.id));
    setSportSearch(sport.name);
    setShowSportDropdown(false);
  };

  const handleAddGuest = () => {
    if (guestInput.trim() && !guests.includes(guestInput.trim())) {
      setGuests([...guests, guestInput.trim()]);
      setGuestInput("");
    }
  };

  const handleRemoveGuest = (guest: string) => {
    setGuests(guests.filter((g) => g !== guest));
  };

  const closeModal = () => setShowCriteriaModal(false);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const playingAt = `${date} ${time}:00`;

    const activityData = {
      sport_id: Number(sportId),
      address,
      city,
      zip_code: zipCode,
      playing_at: playingAt,
      playing_duration: Number(duration),
      nb_places: Number(nbPlaces),
      description: description || null,
      price: isFree ? 0 : Number(price),
      visibility: isPublic,
      auto_validation: isPublic ? autoValidation : false,
      level,
      locker,
      shower,
      toilet,
      air_conditioning: airConditioning,
    };

    try {
      const response = await fetch("/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la publication");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="publication-page">
        <section className="publication-success">
          <h2>Annonce publiée !</h2>
          <p>Votre activité a été créée avec succès.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="publication-page">
      <h1>Publier une annonce</h1>
      <p className="required-fields">*Champs obligatoires</p>

      <form className="publication-form" onSubmit={handleSubmit}>
        <div className="combobox" ref={comboboxRef}>
          <div className="input-with-icon">
            <img src={SearchIcon} alt="" width="24" height="24" />
            <input
              type="text"
              placeholder="Sport *"
              value={sportSearch}
              onChange={(e) => {
                setSportSearch(e.target.value);
                setSportId("");
                setShowSportDropdown(true);
              }}
              onFocus={() => setShowSportDropdown(true)}
              required={!sportId}
            />
          </div>
          {showSportDropdown && filteredSports.length > 0 && (
            <ul className="combobox-dropdown">
              {filteredSports.slice(0, 100).map((sport) => (
                <li key={sport.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectSport(sport)}
                  >
                    {sport.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <input type="hidden" name="sportId" value={sportId} />
        </div>

        <div className="input-with-icon">
          <img src={LocationIcon} alt="" width="24" height="24" />
          <input
            type="text"
            placeholder="Adresse *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="field-row">
          <div className="input-with-icon">
            <img src={LocationIcon} alt="" width="24" height="24" />
            <input
              type="text"
              placeholder="Code postal *"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          <div className="input-with-icon">
            <img src={LocationIcon} alt="" width="24" height="24" />
            <input
              type="text"
              placeholder="Ville *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field-row field-row-3">
          <div className="input-with-icon date-input-wrapper">
            <img src={CalenderIcon} alt="" width="24" height="24" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {!date && <span className="date-placeholder">Date *</span>}
          </div>

          <div className="input-with-icon time-input-wrapper">
            <img src={ClockIcon} alt="" width="24" height="24" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            {!time && <span className="time-placeholder">Heure *</span>}
          </div>

          <div className="input-with-icon">
            <img src={DurationIcon} alt="" width="24" height="24" />
            <input
              type="number"
              placeholder="Durée *"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min="1"
            />
          </div>
        </div>

        <div className="input-with-icon">
          <img src={PeopleIcon} alt="" width="24" height="24" />
          <input
            type="number"
            placeholder="Nombre de places *"
            value={nbPlaces}
            onChange={(e) => setNbPlaces(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="budget-row">
          <span className="budget-label">Budget * :</span>
          <div className="radio-options">
            <label className="radio-label">
              <input
                type="radio"
                name="pricing"
                checked={isFree}
                onChange={() => setIsFree(true)}
              />
              Gratuit
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="pricing"
                checked={!isFree}
                onChange={() => setIsFree(false)}
              />
              Payant
            </label>
          </div>

          <div
            className={`input-with-icon price-input-wrapper ${isFree ? "disabled" : ""}`}
          >
            <img src={PriceIcon} alt="" width="24" height="24" />
            <input
              type="number"
              placeholder="Prix (€)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              disabled={isFree}
              required={!isFree}
            />
          </div>
        </div>

        <textarea
          placeholder="Description ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <button
          type="button"
          className="btn-criteria"
          onClick={() => setShowCriteriaModal(true)}
        >
          Ajouter des critères
        </button>

        {(locker ||
          shower ||
          toilet ||
          airConditioning ||
          level !== "All" ||
          handisport) && (
          <section className="criteria-summary">
            <strong>Critères :</strong>
            <ul>
              {level !== "All" && <li>Niveau : {level}</li>}
              {locker && <li>Vestiaire</li>}
              {shower && <li>Douche</li>}
              {toilet && <li>Toilette</li>}
              {airConditioning && <li>Climatisation</li>}
              {handisport && <li>Handisport</li>}
            </ul>
          </section>
        )}

        <div className="status-box">
          <span className="status-label">Status * :</span>
          <label className="radio-label">
            <input
              type="radio"
              name="visibility"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
            />
            Public
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="visibility"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
            />
            Privée
          </label>
        </div>

        {isPublic ? (
          <div className="status-box">
            <span className="status-label">Réservation automatique * :</span>
            <label className="radio-label">
              <input
                type="radio"
                name="autoValidation"
                checked={autoValidation}
                onChange={() => setAutoValidation(true)}
              />
              Oui
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="autoValidation"
                checked={!autoValidation}
                onChange={() => setAutoValidation(false)}
              />
              Non
            </label>
          </div>
        ) : (
          <fieldset className="fieldset-guests">
            <legend>Liste des personnes</legend>

            <div className="guest-input-row">
              <input
                type="text"
                value={guestInput}
                onChange={(e) => setGuestInput(e.target.value)}
                placeholder="Nom ou email"
              />
              <button
                type="button"
                onClick={handleAddGuest}
                className="btn-invite"
              >
                Inviter
              </button>
            </div>

            {guests.length > 0 && (
              <ul className="guest-list">
                {guests.map((guest) => (
                  <li key={guest}>
                    {guest}
                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(guest)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </fieldset>
        )}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-publish" disabled={isSubmitting}>
          {isSubmitting ? "Publication..." : "Publier"}
        </button>
      </form>

      {showCriteriaModal && (
        <dialog className="modal-criteria" open onKeyDown={handleModalKeyDown}>
          <h2>Critères</h2>

          <fieldset>
            <legend>Niveau</legend>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as typeof level)}
            >
              <option value="All">Tout niveau</option>
              <option value="begginer">Débutant</option>
              <option value="amateur">Amateur</option>
              <option value="advance">Confirmé</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Équipements</legend>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={locker}
                  onChange={(e) => setLocker(e.target.checked)}
                />
                Vestiaire
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={shower}
                  onChange={(e) => setShower(e.target.checked)}
                />
                Douche
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={toilet}
                  onChange={(e) => setToilet(e.target.checked)}
                />
                Toilette
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={airConditioning}
                  onChange={(e) => setAirConditioning(e.target.checked)}
                />
                Climatisation
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Accessibilité</legend>
            <label>
              <input
                type="checkbox"
                checked={handisport}
                onChange={(e) => setHandisport(e.target.checked)}
              />
              Handisport
            </label>
          </fieldset>

          <button type="button" className="btn-validate" onClick={closeModal}>
            Valider
          </button>
        </dialog>
      )}
    </main>
  );
}

export default Publication;
