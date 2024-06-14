import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Film, FilmSliceState, Status} from './types'
import { fetchFilms } from './asyncActions'

const initialState: FilmSliceState = {
  items: [],
  status: Status.LOADING
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Film[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchFilms.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  }
})

export const { setItems } = filmsSlice.actions;

export default filmsSlice.reducer;