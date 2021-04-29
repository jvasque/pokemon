import "./App.css";
import React , {useEffect} from "react";
import { CargaPokemon } from "../rutasPrincipal/CargaPokemon";
import { useDispatch, useSelector } from "react-redux";
import Details from "../details/Details";
import { Link, Route, Switch } from "react-router-dom";
import { changeBackground , loadPokemons } from "../../slice/pokemonSlice";
import Types from "../types/Types";

function App() {
  const { changedBackground } = useSelector((state) => state.pokemon);
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(loadPokemons());
    //dispatch(loadPokemonApi());
  }, [dispatch]);

  const NoMatch = () => <div>Not Found</div>;
  const onSubmitChange = () => {
    dispatch(changeBackground(!changedBackground));
  };

  return (
    <div>
      {/* {Links} */}
      {changedBackground ? (
        <div className="App">
          <Link exact="true" to="/pokemons" onClick={onSubmitChange}>
            <div>
              <button className="App-logo "></button>
            </div>
          </Link>
        </div>
      ) : (
        <div className="Principal">
          <ul>
            <li>
              <Link
                exact="true"
                to="/"
                style={{ textDecoration: "none", color: "green" }}
                onClick={onSubmitChange}
              >
                <h1 className="title font-effect-shadow-multiple">
                 Pokemon
                </h1>
              </Link>
            </li>
            <li>
              <Link exact="true" to="/pokemons">
                <div>
                  <button className="App-logo "></button>
                </div>
              </Link>
            </li>
            <li>
              <Link exact="true" to="/types">
                <div>
                  <button>Pokemon's Types</button>
                </div>
              </Link>
            </li>
          </ul>

          {/* {Routes} */}
          <Switch>
            <Route
              exact
              path="/pokemons/:id"
              render={({ match }) => <Details id={match.params.id} />}
            />

            <Route
              exact
              path="/pokemons"
              style={{ textDecoration: "none" }}
              component={CargaPokemon}
            />

            <Route
              exact
              path="/types"
              style={{ textDecoration: "none" }}
              component={Types}
            />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
