import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import "../styles/variables.css";
import "../styles/ActivityForm.css";
import AddIcon from "../assets/Icons/AddIcon.svg";
import CalenderIcon from "../assets/Icons/CalenderIcon.svg";
import ClockIcon from "../assets/Icons/ClockIcon.svg";
import DurationIcon from "../assets/Icons/DurationIcon.svg";
import LocationIcon from "../assets/Icons/LocationIcon.svg";
import PeopleIcon from "../assets/Icons/PeopleIcon.svg";
import PriceIcon from "../assets/Icons/PriceIcon.svg";
import ProfileIcon from "../assets/Icons/ProfileIcon.svg";
import RemoveIcon from "../assets/Icons/RemoveIcon.svg";
import SearchIcon from "../assets/Icons/SearchIcon.svg";

function ActivityForm() {
  const navigate = useNavigate();
  const [sports, setSports] = useState<Sport[]>([]);
  const [sportId, setSportId] = useState("");
  const [sportSearch, setSportSearch] = useState("");
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);
  const sportsDropdownRef = useRef<HTMLDivElement>(null);
  const criteriaModalRef = useRef<HTMLDialogElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const durationRef = useRef<HTMLInputElement>(null);
  const nbPlacesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [autoValidation, setAutoValidation] = useState(false);
  const [guestInput, setGuestInput] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/sports`)
      .then((res) => res.json())
      .then((sports) => setSports(sports))
      .catch(() => setError("Impossible de charger les sports"));
  }, []);

  useEffect(() => {
    const hideSportsDropdown = (e: MouseEvent) => {
      if (
        sportsDropdownRef.current &&
        !sportsDropdownRef.current.contains(e.target as Node)
      ) {
        setShowSportsDropdown(false);
      }
    };
    document.addEventListener("mousedown", hideSportsDropdown);
    return () => document.removeEventListener("mousedown", hideSportsDropdown);
  }, []);

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(sportSearch.toLowerCase()),
  );

  const selectSport = (sport: Sport) => {
    setSportId(String(sport.id));
    setSportSearch(sport.name);
    setShowSportsDropdown(false);
  };

  const addGuest = () => {
    if (guestInput.trim() && !guests.includes(guestInput.trim())) {
      setGuests([...guests, guestInput.trim()]);
      setGuestInput("");
    }
  };

  const removeGuest = (guest: string) => {
    setGuests(guests.filter((g) => g !== guest));
  };

  const openCriteriaModal = () => {
    criteriaModalRef.current?.showModal();
  };

  const closeCriteriaModal = () => {
    criteriaModalRef.current?.close();
  };

  const createActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const activityData = {
      user_id: 1, // TODO: remplacer après authentification !
      sport_id: Number(sportId),
      address: addressRef.current?.value || "",
      city: cityRef.current?.value || "",
      zip_code: zipCodeRef.current?.value || "",
      playing_at: date,
      playing_time: `${time}:00`,
      playing_duration: Number(durationRef.current?.value) || 0,
      nb_spots: Number(nbPlacesRef.current?.value) || 0,
      description: descriptionRef.current?.value || null,
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/activity`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activityData),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la publication");
      }

      toast.success("Activité créée avec succès !");
      setTimeout(() => navigate("/myactivities/publications"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="publication-page">
      <h1>Publier une annonce</h1>
      <p className="required-fields">*Champs obligatoires</p>

      <form className="publication-form" onSubmit={createActivity}>
        <div className="combobox" ref={sportsDropdownRef}>
          <div className="input-with-icon">
            <img src={SearchIcon} alt="" width="24" height="24" />
            <input
              type="text"
              placeholder="Sport *"
              value={sportSearch}
              onChange={(e) => {
                setSportSearch(e.target.value);
                setSportId("");
                setShowSportsDropdown(true);
              }}
              onFocus={() => setShowSportsDropdown(true)}
              required={!sportId}
            />
          </div>
          {showSportsDropdown && filteredSports.length > 0 && (
            <ul className="combobox-dropdown">
              {filteredSports.slice(0, 250).map((sport) => (
                <li key={sport.id}>
                  <button type="button" onClick={() => selectSport(sport)}>
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
            ref={addressRef}
            required
          />
        </div>

        <div className="field-row">
          <div className="input-with-icon">
            <img src={LocationIcon} alt="" width="24" height="24" />
            <input
              type="text"
              placeholder="Code postal *"
              ref={zipCodeRef}
              required
            />
          </div>

          <div className="input-with-icon">
            <img src={LocationIcon} alt="" width="24" height="24" />
            <input type="text" placeholder="Ville *" ref={cityRef} required />
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
              ref={durationRef}
              required
              min="1"
            />
          </div>
        </div>

        <div className="places-budget-description-row">
          <div className="places-budget-column">
            <div className="input-with-icon">
              <img src={PeopleIcon} alt="" width="24" height="24" />
              <input
                type="number"
                placeholder="Nombre de places *"
                ref={nbPlacesRef}
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
                className={`price-input-wrapper ${isFree ? "disabled" : ""}`}
              >
                <img src={PriceIcon} alt="" width="20" height="20" />
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
          </div>

          <textarea
            placeholder="Description ..."
            ref={descriptionRef}
            rows={4}
          />
        </div>

        {(locker ||
          shower ||
          toilet ||
          airConditioning ||
          level !== "All" ||
          handisport) && (
          <div className="criteria-tags">
            {level !== "All" && (
              <span className="criteria-tag">
                {level === "begginer"
                  ? "Débutant"
                  : level === "amateur"
                    ? "Intermédiaire"
                    : "Confirmé"}
                <button type="button" onClick={() => setLevel("All")}>
                  ✕
                </button>
              </span>
            )}
            {locker && (
              <span className="criteria-tag">
                Vestiaires
                <button type="button" onClick={() => setLocker(false)}>
                  ✕
                </button>
              </span>
            )}
            {shower && (
              <span className="criteria-tag">
                Douches
                <button type="button" onClick={() => setShower(false)}>
                  ✕
                </button>
              </span>
            )}
            {toilet && (
              <span className="criteria-tag">
                Toilettes
                <button type="button" onClick={() => setToilet(false)}>
                  ✕
                </button>
              </span>
            )}
            {airConditioning && (
              <span className="criteria-tag">
                Climatisation
                <button type="button" onClick={() => setAirConditioning(false)}>
                  ✕
                </button>
              </span>
            )}
            {handisport && (
              <span className="criteria-tag">
                Handisport
                <button type="button" onClick={() => setHandisport(false)}>
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        <button
          type="button"
          className="btn-criteria"
          onClick={openCriteriaModal}
        >
          Ajouter des critères
        </button>

        <section className="criteria-desktop">
          <header className="criteria-desktop-header">
            <h3>Critères supplémentaires</h3>
            <button
              type="button"
              onClick={() => {
                setLocker(false);
                setShower(false);
                setToilet(false);
                setAirConditioning(false);
                setLevel("All");
                setHandisport(false);
              }}
            >
              Effacer filtres
            </button>
          </header>
          <div className="criteria-desktop-columns">
            <fieldset className="criteria-desktop-column">
              <legend>Équipements</legend>
              <label>
                Vestiaires
                <input
                  type="checkbox"
                  checked={locker}
                  onChange={(e) => setLocker(e.target.checked)}
                />
              </label>
              <label>
                Douches
                <input
                  type="checkbox"
                  checked={shower}
                  onChange={(e) => setShower(e.target.checked)}
                />
              </label>
              <label>
                Toilettes
                <input
                  type="checkbox"
                  checked={toilet}
                  onChange={(e) => setToilet(e.target.checked)}
                />
              </label>
              <label>
                Climatisation
                <input
                  type="checkbox"
                  checked={airConditioning}
                  onChange={(e) => setAirConditioning(e.target.checked)}
                />
              </label>
            </fieldset>
            <fieldset className="criteria-desktop-column">
              <legend>Niveau</legend>
              <label>
                Tout niveau
                <input
                  type="radio"
                  name="levelDesktop"
                  checked={level === "All"}
                  onChange={() => setLevel("All")}
                />
              </label>
              <label>
                Débutant
                <input
                  type="radio"
                  name="levelDesktop"
                  checked={level === "begginer"}
                  onChange={() => setLevel("begginer")}
                />
              </label>
              <label>
                Intermédiaire
                <input
                  type="radio"
                  name="levelDesktop"
                  checked={level === "amateur"}
                  onChange={() => setLevel("amateur")}
                />
              </label>
              <label>
                Confirmé
                <input
                  type="radio"
                  name="levelDesktop"
                  checked={level === "advance"}
                  onChange={() => setLevel("advance")}
                />
              </label>
            </fieldset>
            <fieldset className="criteria-desktop-column">
              <legend>Type de sport</legend>
              <label>
                Handisport
                <input
                  type="checkbox"
                  checked={handisport}
                  onChange={(e) => setHandisport(e.target.checked)}
                />
              </label>
            </fieldset>
          </div>
        </section>

        <div className="status-row">
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

          {isPublic && (
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
          )}

          {!isPublic && (
            <div className="guests-section">
              {guests.map((guest) => (
                <div key={guest} className="guest-row added-guest">
                  <div className="guest-input-display">
                    <img src={ProfileIcon} alt="" width="22" height="22" />
                    <span>{guest}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-remove-guest"
                    onClick={() => removeGuest(guest)}
                    aria-label={`Retirer ${guest}`}
                  >
                    <img src={RemoveIcon} alt="" width="20" height="20" />
                  </button>
                </div>
              ))}

              <div className="guest-row invite-row">
                <div className="guest-input-display">
                  <img src={ProfileIcon} alt="" width="22" height="22" />
                  <input
                    type="text"
                    value={guestInput}
                    onChange={(e) => setGuestInput(e.target.value)}
                    placeholder="Inviter des personnes"
                  />
                </div>
                <button
                  type="button"
                  className="btn-add-guest"
                  onClick={addGuest}
                  aria-label="Ajouter une personne"
                >
                  <img src={AddIcon} alt="" width="20" height="20" />
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-publish" disabled={isSubmitting}>
          {isSubmitting ? "Publication..." : "Publier"}
        </button>
      </form>

      <dialog
        className="modal-criteria"
        ref={criteriaModalRef}
        onClick={(e) =>
          e.target === criteriaModalRef.current && closeCriteriaModal()
        }
        onKeyDown={(e) => e.key === "Escape" && closeCriteriaModal()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close"
              onClick={closeCriteriaModal}
            >
              ✕
            </button>
            <button
              type="button"
              className="modal-clear"
              onClick={() => {
                setLocker(false);
                setShower(false);
                setToilet(false);
                setAirConditioning(false);
                setLevel("All");
                setHandisport(false);
              }}
            >
              Tout effacer
            </button>
          </div>

          <fieldset className="criteria-fieldset">
            <legend>Équipements</legend>
            <div className="criteria-group">
              <label className="criteria-label">
                Vestiaires
                <input
                  type="checkbox"
                  checked={locker}
                  onChange={(e) => setLocker(e.target.checked)}
                />
              </label>
              <label className="criteria-label">
                Douches
                <input
                  type="checkbox"
                  checked={shower}
                  onChange={(e) => setShower(e.target.checked)}
                />
              </label>
              <label className="criteria-label">
                Toilettes
                <input
                  type="checkbox"
                  checked={toilet}
                  onChange={(e) => setToilet(e.target.checked)}
                />
              </label>
              <label className="criteria-label">
                Climatisation
                <input
                  type="checkbox"
                  checked={airConditioning}
                  onChange={(e) => setAirConditioning(e.target.checked)}
                />
              </label>
            </div>
          </fieldset>

          <hr className="criteria-divider" />

          <fieldset className="criteria-fieldset">
            <legend>Niveau</legend>
            <div className="criteria-group">
              <label className="criteria-label">
                Tout niveau
                <input
                  type="radio"
                  name="level"
                  checked={level === "All"}
                  onChange={() => setLevel("All")}
                />
              </label>
              <label className="criteria-label">
                Débutant
                <input
                  type="radio"
                  name="level"
                  checked={level === "begginer"}
                  onChange={() => setLevel("begginer")}
                />
              </label>
              <label className="criteria-label">
                Intermédiaire
                <input
                  type="radio"
                  name="level"
                  checked={level === "amateur"}
                  onChange={() => setLevel("amateur")}
                />
              </label>
              <label className="criteria-label">
                Confirmé
                <input
                  type="radio"
                  name="level"
                  checked={level === "advance"}
                  onChange={() => setLevel("advance")}
                />
              </label>
            </div>
          </fieldset>

          <hr className="criteria-divider" />

          <fieldset className="criteria-fieldset">
            <legend>Type de sport</legend>
            <div className="criteria-group">
              <label className="criteria-label">
                Handisport
                <input
                  type="checkbox"
                  checked={handisport}
                  onChange={(e) => setHandisport(e.target.checked)}
                />
              </label>
            </div>
          </fieldset>

          <button
            type="button"
            className="btn-validate"
            onClick={closeCriteriaModal}
          >
            Valider
          </button>
        </div>
      </dialog>
      <Toaster position="top-center" />
    </main>
  );
}

export default ActivityForm;
