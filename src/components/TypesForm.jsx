import P from "../Pokedex.js";
import { useEffect } from "react";
import { useState } from "react";

const TypesForm = ({ onTypeFilter }) => {
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    const res = await P.getTypesList();
    const types = res.results.filter(
      (type) => type.name !== "unknown" && type.name !== "shadow"
    );
    setTypesList(types);
  };

  return (
    <div class="form-check type-filter">
      <div>
        <input
          onClick={() => onTypeFilter("")}
          class="form-check-input"
          value=""
          type="radio"
          name="flexRadioDefault"
          id="all-types"
        />
        <label class="form-check-label" htmlFor="all-types">
          All
        </label>
      </div>
      {typesList.map((type) => (
        <div>
          <input
            onClick={() => onTypeFilter(type.name)}
            class="form-check-input"
            value={type.name}
            type="radio"
            name="flexRadioDefault"
            id={type.name}
          />
          <label class="form-check-label" htmlFor={type.name}>
            {type.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TypesForm;
