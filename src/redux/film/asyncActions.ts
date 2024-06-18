import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'HNNXBS0-MT3MQXW-PZ7C4BW-FC6PRH8' },
};

export type fetchFilmProps = {
  id: number,
}

export const fetchFilm = createAsyncThunk<Film, fetchFilmProps>(
  'film/fetchfilmStatus',
  async ({ id }) => {
    const { data } = await axios.get(
      `https://api.kinopoisk.dev/v1.4/movie/${id}`,
      options,
    );
    const result = {
      name: data?.name || data.alternativeName,
      description: data.description,
      poster: data?.poster?.url || "https://www.kino-teatr.ru/static/images/no_poster.jpg",
      rating: data.rating.imdb !== undefined && data.rating.imdb !== 0 ? `рейтинг: ${data.rating.imdb}` : '',
      year: data.year,
      genres: data.genres,
    }
    return result;
  }
);
