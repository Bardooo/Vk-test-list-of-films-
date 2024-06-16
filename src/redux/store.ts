import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import films from './films/slice'
import genres from './genres/slice'

export const store = configureStore({
  reducer: {
    films,
    genres,
  }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch