import React from "react";
import { searchBy } from "../../slice/pokemonSlice";
import { useDispatch} from "react-redux";

const Selects = () => {
  const dispatch = useDispatch();

  const onChangeValue = (e) => {
    dispatch(searchBy(e.target.value));
  };

  return (
    <div onChange={onChangeValue}>
      <label>Search...</label>
      <select
        id="searchBy"
        name="searchBy"
        onChange={onChangeValue}
        defaultValue={"true"}
      >
        <option value="true">By Name</option>
        <option value="false"> By ID</option>
      </select>
    </div>
  );
};

export default Selects;
