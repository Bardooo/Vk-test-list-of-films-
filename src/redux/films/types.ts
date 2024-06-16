export type Film = {
  id: number;
  name: string;
  description: string | null;
  poster: string;
  rating: string;
  year: string;
  genres: { name: string }[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export interface FilmSliceState {
  filmItems: Film[];
  filmStatus: Status;
}