import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Genre, GenresSliceState} from './types'
import { fetchGenres } from './asyncActions'

const initialState: GenresSliceState = {
  genreItems: [],
};

const GenresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres(state, action: PayloadAction<Genre[]>) {
      state.genreItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.genreItems = [];
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genreItems = action.payload;
    });
    builder.addCase(fetchGenres.rejected, (state) => {
      state.genreItems = [];
    });
  }
})

export const { setGenres } = GenresSlice.actions;

export default GenresSlice.reducer;