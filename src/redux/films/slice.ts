import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilmsSliceState, Status} from './types'
import { fetchFilms, FilmsType } from './asyncActions'

const initialState: FilmsSliceState = {
  filmItems: [],
  pages: 0,
  filmStatus: Status.LOADING
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<FilmsType>) {
      state.filmItems = action.payload.filmItems;
      state.pages = action.payload.pages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.filmItems = [];
      state.filmStatus = Status.LOADING;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.filmItems = action.payload.filmItems;
      state.pages = action.payload.pages;
      state.filmStatus = Status.SUCCESS;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.filmStatus = Status.ERROR;
      state.filmItems = [];
      state.pages = 0
    });
  }
})

export const { setItems } = filmsSlice.actions;

export default filmsSlice.reducer;