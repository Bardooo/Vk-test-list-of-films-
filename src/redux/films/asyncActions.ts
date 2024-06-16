import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'Z0YAZQF-BWQM317-K2MS6WX-SWA58YT' },
};

export const fetchFilms = createAsyncThunk<Film[], number>(
  'films/fetchfilmsStatus',
  async (page) => {
    const { data } = await axios.get(
      `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=50`,
      options,
    );
    const transformedData = data.docs.map((item) => {
      return {
        name: item?.name || item.alternativeName,
        poster: item?.poster?.url || "https://www.kino-teatr.ru/static/images/no_poster.jpg",
        description: item.description,
        rating: item.rating.imdb !== undefined && item.rating.imdb !== 0 ? `рейтинг: ${item.rating.imdb}` : '',
        year: `год: ${item.year}`,
        genres: item.genres,
      };
    });
    return transformedData;
  }
);
