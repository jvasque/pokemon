import React from "react";
import { filterBy } from "../../slice/pokemonSlice";
import { useDispatch } from "react-redux";
import "./Filters.css";
const Filters = () => {
  const dispatch = useDispatch();

  const onChangeValue = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterBy(e.target.value));
  };
  const types = [
    "All",
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "unknown",
    "shadow",
  ];
  const optionsOrder = [
    "A-Z",
    "Z-A",
    "Weak-Strong",
    "Strong-Weak",
    "Pokemon Created",
    "Pokemon API's",
  ];

  const select = types.map((type, i) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));
  const order = optionsOrder.map((option, i) => (
    <option key={i} value={i}>
      {option}
    </option>
  ));
  return (
    <div className="dropdown-container ">
      <p>Select a option to filter:</p>
      <select name="filterBy" onChange={onChangeValue}>
        {select}
        {order}
      </select>
    </div>
  );
};

export default Filters;
