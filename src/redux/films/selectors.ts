import { RootState } from "../store";

export const selectFilmsData = (state: RootState) => state.films;