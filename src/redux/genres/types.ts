export type Genre = {
  value: string,
  label: string,
};

export interface GenresSliceState {
  genreItems: Genre[];
}