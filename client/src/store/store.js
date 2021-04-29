import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../slice/pokemonSlice';

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});