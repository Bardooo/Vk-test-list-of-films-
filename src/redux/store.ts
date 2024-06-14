import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import films from './films/slice'

export const store = configureStore({
  reducer: {
    films,
  }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch