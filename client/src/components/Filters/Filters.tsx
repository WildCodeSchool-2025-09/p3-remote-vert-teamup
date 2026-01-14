import "./Filters.css";
import { useState } from "react";

type Filters = {
  locker: boolean;
  shower: boolean;
  toilet: boolean;
  air_conditioning: boolean;
  level: string | null;
  price: number | null;
  disabled: boolean;
};

type EquipmentOptionsType = {
  key: keyof Filters;
  label: string;
};

const EQUIPMENT_OPTIONS: EquipmentOptionsType[] = [
  { key: "locker", label: "Vestiaires" },
  { key: "shower", label: "Douches" },
  { key: "toilet", label: "Toilettes" },
  { key: "air_conditioning", label: "Climatisation" },
];

type LevelOptionsType = {
  key: string;
  label: string;
};

const LEVEL_OPTIONS: LevelOptionsType[] = [
  { key: "all", label: "Tout Niveu" },
  { key: "amateur", label: "Débutant" },
  { key: "begginer", label: "Intermédiaire" },
  { key: "advance", label: "Confirmé" },
];

const initialState = {
  locker: false,
  shower: false,
  toilet: false,
  air_conditioning: false,
  level: null,
  price: 30,
  disabled: false,
};

function Filters() {
  const [filters, setFilters] = useState<Filters>(initialState);
  const [filteredActivities, setFilteredActivities] = useState({});
  const [prevPayedPrice, setPrevPayedPrice] = useState(30);

  const isFree = filters.price === 0;

  console.log(filters.price);
  console.log(filteredActivities);

  const resetFilters = () => {
    setFilters(initialState);
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
          isFree: checked,
          price: checked ? 0 : prevPayedPrice,
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
          throw new Error("Request Failed");
        }
        return res.json();
      })
      .then((data) => setFilteredActivities(data))
      .catch((err) => {
        console.log(err);
      });
  };

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
                    checked={filters[e.key] as boolean}
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
                      checked={filters.level === e.key}
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
                  checked={isFree}
                  onChange={handleCheckbox}
                />
              </label>
            </div>
            <div>
              <label>
                Payent
                <input
                  type="range"
                  name="price"
                  max={100}
                  value={filters.price ?? 0}
                  disabled={isFree}
                  onChange={(e) => {
                    setFilters((prev) => {
                      const value = Number(e.target.value);
                      setPrevPayedPrice(value === 0 ? 30 : value);
                      return {
                        ...prev,
                        price: value,
                      };
                    });
                  }}
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
                  checked={filters.disabled}
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
