export type Film = {
  name: string,
  poster: string,
  description: string,
  rating: number,
  year: number,
  genres: [{name: string}],
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