import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Film, FilmSliceState, Status} from './types'
import { fetchFilm } from './asyncActions'

const initialState: FilmSliceState = {
  film: {
    name: '',
    description: '',
    poster: '',
    rating: '',
    year: 0,
    genres: []
  },
  filmStatus: Status.LOADING
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setFilm(state, action: PayloadAction<Film>) {
      state.film = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilm.pending, (state) => {
      state.film = {
        name: '',
        description: '',
        poster: '',
        rating: '',
        year: 0,
        genres: []
      };
      state.filmStatus = Status.LOADING;
    });
    builder.addCase(fetchFilm.fulfilled, (state, action) => {
      state.film = action.payload;
      state.filmStatus = Status.SUCCESS;
    });
    builder.addCase(fetchFilm.rejected, (state) => {
      state.filmStatus = Status.ERROR;
      state.film = {
        name: '',
        description: '',
        poster: '',
        rating: '',
        year: 0,
        genres: []
      };
    });
  }
})

export const { setFilm } = filmSlice.actions;

export default filmSlice.reducer;