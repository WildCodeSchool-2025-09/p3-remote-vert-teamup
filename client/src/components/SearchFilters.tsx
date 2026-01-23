import "../styles/SearchFilters.css";
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

type SearchFilterProps = {
  setFilters?: React.Dispatch<
    React.SetStateAction<{
      sport: string;
      playingAt: string;
      city: string;
    }>
  >;
};

type EquipmentOptionsType = {
  key: keyof Filters;
  label: string;
};

type LevelOptionsType = {
  key: string;
  label: string;
};

const equipmentOptions: EquipmentOptionsType[] = [
  { key: "locker", label: "Vestiaires" },
  { key: "shower", label: "Douches" },
  { key: "toilet", label: "Toilettes" },
  { key: "air_conditioning", label: "Climatisation" },
];

const levelOptions: LevelOptionsType[] = [
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
  price: null,
  disabled: false,
};

function SearchFilters({ setFilters }: SearchFilterProps) {
  const [optionalFilters, setOptionalFilters] = useState<Filters>(initialState);
  const [prevPayedPrice, setPrevPayedPrice] = useState(15);

  const isFree = optionalFilters.price === 0;

  const resetFilters = () => {
    setOptionalFilters(initialState);
    setFilters?.((prev) => ({
      ...prev,
      optionalFilters,
    }));
  };

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    setOptionalFilters((prev) => {
      // if (name === "price") {
      //   return {
      //     ...prev,
      //     price: checked ? 0 : prevPayedPrice,
      //   };
      // }

      const updates: Record<string, Partial<Filters>> = {
        equipment: { [value]: checked },
        level: { level: value },
        price: { price: checked ? 0 : prevPayedPrice },
        disabled: { disabled: checked },
      };

      return {
        ...prev,
        ...updates[name],
      };
    });
  };

  const validateFilters = () => {
    setFilters?.((prev) => {
      return {
        ...prev,
        ...optionalFilters,
      };
    });
  };

  return (
    <>
      <section className="section">
        <div className="reset-btns-container flex-spacing">
          <button type="button" className="close-btn cls-btn-size">
            X
          </button>
          <button type="button" className="close-btn" onClick={resetFilters}>
            Tout effacer
          </button>
        </div>
        <div className="container">
          <fieldset className="equipment">
            <legend className="filter-title">Équipements</legend>
            <div className="flex-clmn">
              {equipmentOptions.map((e) => (
                <label key={e.key} className="flex-spacing ttls">
                  {e.label}
                  <input
                    className="checkbox-pointers"
                    type="checkbox"
                    name="equipment"
                    value={e.key}
                    checked={optionalFilters[e.key] as boolean}
                    onChange={updateFilters}
                  />
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="equipment">
            <legend className="filter-title">Niveau</legend>
            <div className="flex-clmn">
              {levelOptions.map((e) => {
                return (
                  <label key={e.key} className="flex-spacing ttls">
                    {e.label}
                    <input
                      className="checkbox-pointers"
                      type="radio"
                      name="level"
                      value={e.key}
                      checked={optionalFilters.level === e.key}
                      onChange={updateFilters}
                    />
                  </label>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="">
            <legend className="filter-title">Budget</legend>
            <div className="flex-clmn">
              <label className="flex-spacing ttls">
                Gratuit
                <input
                  className="checkbox-pointers"
                  type="checkbox"
                  name="price"
                  checked={isFree}
                  onChange={updateFilters}
                />
              </label>
              <span className={`price-tag ${isFree && "slider-disabled"}`}>
                {optionalFilters.price}€
              </span>
              <label
                className={`flex-spacing ttls ${isFree && "slider-disabled"}`}
              >
                Payant
                <input
                  className={`slider ${isFree && "slider-disabled"}`}
                  id="myRange"
                  type="range"
                  name="price"
                  min={0}
                  max={100}
                  value={optionalFilters.price ?? 0}
                  onChange={(e) => {
                    setOptionalFilters((prev) => {
                      const value = Number(e.target.value);
                      setPrevPayedPrice(value === 0 ? 15 : value);
                      return {
                        ...prev,
                        price: value,
                      };
                    });
                  }}
                />
                <span className={`${isFree && "slider-disabled"}`}> 100€</span>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend className="filter-title">Type de Sport</legend>
            <div className="flex-clmn">
              <label className="flex-spacing ttls">
                Handisport
                <input
                  className="checkbox-pointers"
                  type="checkbox"
                  name="disabled"
                  checked={optionalFilters.disabled}
                  onChange={updateFilters}
                />
              </label>
              <button
                type="button"
                onClick={validateFilters}
                className="validate-btn"
              >
                Valider
              </button>
            </div>
          </fieldset>
        </div>
      </section>
    </>
  );
}

export default SearchFilters;
