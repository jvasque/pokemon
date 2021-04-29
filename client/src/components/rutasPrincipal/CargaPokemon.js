import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPokemons, searchBy, loadTypes } from "../../slice/pokemonSlice";
import RutaPrincipal from "./RutaPrincipal";

//archivo principal

export function CargaPokemon() {
  let { hasError, isLoading} = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(loadPokemons());
    dispatch(searchBy("true"));
    dispatch(loadTypes());
    //dispatch(loadPokemonApi());
  }, [dispatch]);

  const tryAgainHandler = () => {
    dispatch(loadPokemons());
  };

  return (
    <div style={{ display: "block" }}>
      <div>
        {hasError ? (
          <div id="error-wrapper">
            <h1>Oh no! Someone captured all the pokemons!</h1>
            <button onClick={tryAgainHandler}>¡Try catch again!</button>
          </div>
        ) : isLoading ? (
          <p>Catching pokemons around of the world...</p>
        ) : (
          <div>
            <section>
              <RutaPrincipal />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
