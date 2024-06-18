import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import films from './films/slice'
import genres from './genres/slice'
import film from './film/slice'

export const store = configureStore({
  reducer: {
    films,
    film,
    genres,
  }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch