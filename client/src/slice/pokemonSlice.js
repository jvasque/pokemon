import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//actions y reducer

export const loadPokemons = createAsyncThunk(
  "allPokemons/getAllPokemons",
  async () => {
    if (localStorage.getItem("pokemons")) {
      return JSON.parse(JSON.stringify(localStorage.getItem("pokemons")));
    }
    const response = await axios("http://localhost:3001/pokemons");

    return response.data;
  }
);

export const loadTypes = createAsyncThunk(
  "allPokemons/getloadTypes",
  async (name) => {
    const response = await axios(`http://localhost:3001/types`);

    return response.data;
  }
);

export const loadCreados = createAsyncThunk(
  "allPokemons/getloadCreados",
  async () => {
    const response = await axios(`http://localhost:3001/1*3`);

    return response.data;
  }
);

export const loadPokemonApi = createAsyncThunk(
  "allPokemons/getloadPokemonApi",
  async () => {
    let data = [];

    for (let i = 1; i <= 40; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      await axios(url).then(async (results) => {
        const result = results.data;

        let types = result.types.map((type) => type.type.name);
        let speed = result.stats.filter(
          (stat) => stat.stat["name"] === "speed"
        );
        let life = result.stats.filter((stat) => stat.stat["name"] === "hp");
        let defense = result.stats.filter(
          (stat) => stat.stat["name"] === "defense"
        );
        let image =
          result.id > 649 &&
          Object.values(result.sprites)[8]["official-artwork"].front_default;

        data.push({
          ID: i,
          name: result.name,
          image:
            result.id > 649
              ? image
              : result.sprites.other.dream_world.front_default,
          life: life[0].base_stat,
          weight: result.weight,
          height: result.height,
          speed: speed[0].base_stat,
          defense: defense[0].base_stat,
          type: types,
        });
      });
    }

    return data;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    isLoading: true,
    hasError: false,
    pokemons: [],
    amount: 12,
    type: [],
    name: [],
    changeScreen: false,
    search: true,
    pokemonApi: [],
    pokemonFiltered: [],
    createPokemon: false,
    createdPokemon: [],
    changedBackground: true,
  },
  reducers: {
    pokeName: (state, { payload }) => {
      if (payload === "") state.name = [];
      state.name.push(payload);
    },
    changeScreens: (state, { payload }) => {
      state.changeScreen = payload;
    },
    searchBy: (state, { payload }) => {
      state.search = payload === "true" ? true : false;
    },
    filterBy: (state, { payload }) => {
      if (payload === "0") {
        state.pokemons = state.pokemonFiltered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (payload === "1") {
        state.pokemons.sort((a, b) => a.name.localeCompare(b.name)).reverse();
      } else if (payload === "All") {
        state.pokemons = state.pokemonFiltered;
      } else if (payload === "2") {
        console.log(state.pokemonFiltered);
        state.pokemons = state.pokemonFiltered.sort(
          (a, b) => a.defense - b.defense
        );
      } else if (payload === "3") {
        console.log(state.pokemonFiltered);
        state.pokemons = state.pokemonFiltered
          .sort((a, b) => a.defense - b.defense)
          .reverse();
      } else if (payload === "4") {
        if (state.createdPokemon.length > 0) {
          state.pokemons = state.createdPokemon.map((pokemon) => pokemon);
        }
      } else if (payload === "5") {
        console.log(
          "entro a api",
          JSON.parse(JSON.stringify(state.pokemonApi[0]))
        );
        if (state.pokemonApi[0].length > 0) {
          state.pokemons = JSON.parse(JSON.stringify(state.pokemonApi[0]));
        }
      } else {
        let a = JSON.parse(JSON.stringify(state.pokemonFiltered));
        state.pokemons = a.filter((c) =>
          c.tipos.map((t) => t.name).includes(payload)
        );
      }
    },
    statusFilter: (state, { payload }) => {
      state.filter = payload;
    },
    page: (state, { payload }) => {
      state.pokemons = payload;
    },
    create: (state, { payload }) => {
      state.createPokemon = payload;
    },
    pushCreated: (state, { payload }) => {
      state.createdPokemon.push(payload);
      state.pokemonFiltered.push(payload);
    },
    changeBackground: (state, { payload }) => {
      state.changedBackground = payload;
    },
  },
  extraReducers: {
    [loadPokemons.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadPokemons.fulfilled]: (state, { payload }) => {
      state.pokemons = payload;
      state.pokemonFiltered = payload;
      state.pokemonApi.push(payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [loadPokemons.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },

    [loadTypes.fulfilled]: (state, { payload }) => {
      state.type.push(payload);
    },
    [loadTypes.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadCreados.fulfilled]: (state, { payload }) => {
      state.createdPokemon = payload;

      state.isLoading = false;
      state.hasError = false;
    },
    [loadCreados.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

//cuando pokemons api, return pokemonsFiltered
//cuando pokemons creados, return pokemons por ID y no por id
//crear componente que muestre pokemons creados, renderizar en ruta principal

export const {
  pokeName,
  changeScreens,
  searchBy,
  filterBy,
  page,
  create,
  pushCreated,
  changeBackground,
} = pokemonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default pokemonSlice.reducer;
