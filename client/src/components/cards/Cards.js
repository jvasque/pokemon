import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Cards.css";

const Cards = () => {
  const { pokemons, isLoading } = useSelector((state) => state.pokemon);

  //   const types = pokemons.length >= 1 && pokemons?.map((poke) =>
  //   poke.type.map((pokemon) => <div>{pokemon}</div>)
  // );

  const types =
    pokemons.length >= 1 &&
    pokemons?.map((poke) => poke.tipos?.map((tipo) => <div>{tipo.name}</div>));

   
  const card =
    !isLoading &&
    pokemons?.map((pokemon, i) => (
      <Link to={`/pokemons/${pokemon.id}`}>
        <button
          className={types && types[i] && types[i][0]?.props?.children}
          key={pokemon.name}
          style={{ height: 400 }}
        >
          <div key={pokemon.name} style={{ marginBottom: 15 }}>
            <h5>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h5>
            <img
              style={{
                width: "5rem",
              }}
              src={pokemon.image}
              alt="pokemon"
            />

            <h4 className="card ">Type</h4>

            <div className="card " style={{ fontSize: 20, marginBottom: 12 }}>
              {types[i]}
            </div>
          </div>
        </button>
      </Link>
    ));

  return <div>{card}</div>;
};

export default Cards;
