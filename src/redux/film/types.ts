export type Film = {
  id: number;
  name: string;
  description: string | null;
  poster: string;
  rating: string;
  year: number;
  genres: { name: string }[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export interface FilmSliceState {
  film: Film;
  filmStatus: Status;
}