import "./PokemonName.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeScreens, searchBy } from "../../slice/pokemonSlice";
import RutaPrincipal from "../rutasPrincipal/RutaPrincipal";
import Creation from "../creation/Creation";
import { Link } from "react-router-dom";

const PokemonName = () => {
  const { name, changeScreen, search } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeScreens(!changeScreen));
    dispatch(searchBy("true"));
  };

  //array con data de detalles
  let details = "";
  let card = "";
  let url = "../../img/404.jpg";
  const cardCreator = (datos) => {
    if (!search) {
      details = datos.slice(1);
      details = details[0];
    } else {
      details = datos;
    }
    console.log("name length", details);
    if (details == "404") {
      card = (
        <div>
          <span style={{ color: "white" , fontSize:40 }}>
            Pokemon not exist, You can create it!
          </span>

          <Creation />
        </div>
      );
    } else {
      card = details?.map((details) => (
        <>
          <img
            style={{ height: 200 }}
            src={details?.image}
            alt="detail_Pokemon"
          ></img>
          <p>ID: {details?.ID}</p>
          <p>name: {details.name ? details.name : ""}</p>
          <p>life: {details.life ? details.life : 0}</p>
          <p>weight: {details.weight ? details.weight : 0}</p>
          <p>height: {details.height ? details.height : 0}</p>
          <p>speed: {details.speed ? details.speed : 0}</p>
          <p>defense: {details.defense ? details.defense : 0}</p>
          {/* <p>type: {types}</p> */}
        </>
      ));
    }
  };

  if (search) {
    details = name.length > 1 && cardCreator(name[1]);
  } else {
    details = name.length > 1 && cardCreator(name);
  }

  return (
    <div>
      {changeScreen ? (
        name.length ? (
          <div>
            <button
              style={{ marginTop: 15 }}
              type="button"
              onClick={handleClick}
            >
              Return
            </button>

            <div>
              <h1>Details Pokemon</h1>

              {card}
            </div>
          </div>
        ) : (
          <div>Catching Pokemon...</div>
        )
      ) : (
        <RutaPrincipal />
      )}
    </div>
  );
};
export default PokemonName;
