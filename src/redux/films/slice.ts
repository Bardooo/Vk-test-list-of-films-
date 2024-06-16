import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Film, FilmSliceState, Status} from './types'
import { fetchFilms } from './asyncActions'

const initialState: FilmSliceState = {
  filmItems: [],
  filmStatus: Status.LOADING
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Film[]>) {
      state.filmItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.filmItems = [];
      state.filmStatus = Status.LOADING;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.filmItems = action.payload;
      state.filmStatus = Status.SUCCESS;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.filmStatus = Status.ERROR;
      state.filmItems = [];
    });
  }
})

export const { setItems } = filmsSlice.actions;

export default filmsSlice.reducer;