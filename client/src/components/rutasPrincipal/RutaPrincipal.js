import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  pokeName,
  changeScreens,
  page,
  create,
} from "../../slice/pokemonSlice";
import PokemonName from "../pokemonName/PokemonName";
import Selects from "../selects/Selects";
import Filters from "../filters/Filters";
import Cards from "../cards/Cards";
import Pagination from "../Pagination/Pagination";
import Creation from "../creation/Creation";
import './Rutas.css'
//19/03/2021
/**
 *
 * @returns
 *
 * filtros, paginacion, cambio de input para que segun select
 * envie queryId o Name
 */

const RutaPrincipal = () => {
  const { changeScreen, search, pokemonFiltered, createPokemon } = useSelector(
    (state) => state.pokemon
  );

  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const [buttonType, setButtonType] = useState("text");
  const dispatch = useDispatch();

 // localStorage.setItem("pokemons", JSON.parse(JSON.stringify(pokemonFiltered)));


  useEffect(() => {
    dispatch(page(pokemonFiltered.slice(1, 12)));
  }, [dispatch,pokemonFiltered]);

  useEffect(() => {
    if (!search) {
      setButtonType("number");
    } else {
      setButtonType("text");
    }
  }, [search]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemonFiltered.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  //console.log('current',currentPokemons)
  //crear accion que modifique pokemons a currentPokemons
  // Change page
  const nextPage = (pageNum) => {
    setCurrentPage(pageNum); // console.log(currentPokemons)}
    dispatch(page(currentPokemons));
  };

  const fetchName = async () => {
    dispatch(pokeName(""));
    const response = await axios(
      `http://localhost:3001/pokemons/?name=${input}`
    );
    dispatch(pokeName(await response.data));
  };

  const fetchId = async () => {
    dispatch(pokeName(""));
    const response = await axios(`http://localhost:3001/pokemons/${input}`);
    dispatch(pokeName(await response.data));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    search ? fetchName() : fetchId();

    dispatch(changeScreens(!changeScreen));
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    dispatch(create(!createPokemon));
  };

  //console.log('pokemon',pokemon)

  // const types =  pokemons && pokemons?.map((pokemon, i) => pokemon?.tipos.map((type,i) => <div key={type,i}>{type}</div>));

  return (
    //radiobutton para buscar por id o por name
    /**
    [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
[ ] Paginado para ir buscando y mostrando los siguientes pokemons
si el filtro esta activo muestro pokemons segun el tipo que requiere    

*/

    <div className="">
      {createPokemon ? (
        <div>
          <button onClick={onSubmitCreate}>Return</button>
          <Creation />
        </div>
      ) : changeScreen && !createPokemon ? (
        <>
          <PokemonName />
        </>
      ) : (
        <>
          <form>
            <label>
              Search Pokemons:
              <input
              className="search"
                type={buttonType}
                name="name"
                placeholder="Search..."
                // value={input}
                onChange={(e) => setInput(e.target.value)}
                min="0"
                required
              />
            </label>

            <Link exact="true" to="/pokemons" onClick={onSubmitForm}>
              <button type="submit" value="Submit">
                Search
              </button>
            </Link>
          </form>

          <Selects />
          <Filters />
          <button type="submit" value="Submit" onClick={onSubmitCreate}>
            Create Pokemon
          </button>
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={pokemonFiltered.length}
            nextPage={nextPage}
          />
          <Cards />
        </>
      )}
    </div>
  );
};

export default RutaPrincipal;
