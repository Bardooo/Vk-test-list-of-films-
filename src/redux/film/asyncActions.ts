import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'Z0YAZQF-BWQM317-K2MS6WX-SWA58YT' },
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
      id: data.id,
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
