import "./Filters.css";
import { useState } from "react";

type Filters = {
  locker: boolean;
  douches: boolean;
  toilet: boolean;
  air_conditioning: boolean;
  level: string | null;
  price: number | null;
  handisport: boolean;
};

const EQUIPMENT_OPTIONS = [
  { key: "locker", label: "Vestiaires", checked: false },
  { key: "shower", label: "Douches", checked: false },
  { key: "toilet", label: "Toilettes", checked: false },
  { key: "air_conditioning", label: "Climatisation", checked: false },
];

const LEVEL_OPTIONS = [
  { key: "all", label: "Tout Niveu" },
  { key: "amateur", label: "Débutant" },
  { key: "begginer", label: "Intermédiaire" },
  { key: "advance", label: "Confirmé" },
];

function Filters() {
  const initialState = {
    locker: false,
    shower: false,
    toilet: false,
    air_conditioning: false,
    level: null,
    price: null,
    handisport: false,
  };

  const [filters, setFilters] = useState<Filters | object>(initialState);
  const [filteredActivities, setFilteredActivities] = useState({});
  const [rangeGrayed, setRangeGrayed] = useState(false);
  const [resetAll, setResetAll] = useState(false);

  console.log(filteredActivities);

  const resetFilters = () => {
    setFilters(initialState);
    setResetAll(true);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    setFilters((prev) => {
      if (name === "equipment") {
        return {
          ...prev,
          [value]: checked,
        };
      }

      if (name === "level") {
        return {
          ...prev,
          level: value,
        };
      }

      if (name === "price") {
        return {
          ...prev,
          price: checked ? (checked ? 0 : false) : value,
        };
      }

      if (name === "disabled") {
        return {
          ...prev,
          [name]: checked,
        };
      }

      return prev;
    });
  };

  const fetchData = () => {
    const queryString = new URLSearchParams({
      filters: JSON.stringify(filters),
    }).toString();

    fetch(`http://localhost:3310/api/activity/filters?${queryString}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Eequest Failed");
        }
        return res.json();
      })
      .then((data) => setFilteredActivities(data))
      .catch((err) => {
        console.log(err);
      });
  };

  // const fetchData = () => {
  //   fetch("http://localhost:3310/api/activity/filters", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(filters),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Request Failed");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => setFilteredActivities(data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="filter-btns">
            <button type="button">X</button>
            <button type="button" onClick={resetFilters}>
              Tout efface
            </button>
          </div>
          <fieldset className="equipment">
            <legend>Equipments</legend>
            <div>
              {EQUIPMENT_OPTIONS.map((e) => (
                <label key={e.key}>
                  {e.label}
                  <input
                    type="checkbox"
                    name="equipment"
                    value={e.key}
                    checked={resetAll}
                    onChange={handleCheckbox}
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="equipment">
            <legend>Niveau</legend>
            <div>
              {LEVEL_OPTIONS.map((e) => {
                return (
                  <label key={e.key}>
                    {e.label}
                    <input
                      type="radio"
                      name="level"
                      value={e.key}
                      onChange={handleCheckbox}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="equipoment">
            <legend>Budget</legend>
            <div>
              <label>
                Gratuit
                <input
                  type="checkbox"
                  name="price"
                  // defaultChecked
                  onChange={(e) => {
                    handleCheckbox(e);
                    setRangeGrayed(e.target.checked);
                  }}
                />
              </label>
            </div>
            <div>
              <label>
                Payent
                <input
                  type="range"
                  name="price"
                  id="prange"
                  max={100}
                  defaultValue={0}
                  disabled={rangeGrayed}
                  onChange={handleCheckbox}
                />
              </label>
            </div>
          </fieldset>
          <fieldset className="equipment">
            <legend>Type de Sport</legend>
            <div>
              <label>
                Handisport
                <input
                  type="checkbox"
                  id="disabled"
                  name="disabled"
                  onChange={handleCheckbox}
                />
              </label>
            </div>
          </fieldset>
        </div>
        <button type="button" onClick={fetchData}>
          Validate
        </button>
      </section>
    </>
  );
}

export default Filters;
