import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'Z0YAZQF-BWQM317-K2MS6WX-SWA58YT' },
};

export const fetchFilms = createAsyncThunk<Film[]>(
  'films/fetchfilmsStatus',
  async() => {
    const { data } = await axios.get(
      'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=200',
      options,
    );
    const transformedData = data.docs.map((item) => {
      return {
        name: item?.name || item.alternativeName,
        poster: item?.poster?.url || "https://www.kino-teatr.ru/static/images/no_poster.jpg",
        // poster: item?.poster?.[0] || "https://www.kino-teatr.ru/static/images/no_poster.jpg",
        description: item.description,
        rating: item.rating.imdb,
        // rating: item.rating[1],
        year: item.year,
        genres: item.genres,
      };
    });
    console.log(transformedData);

    return transformedData;
  }
);
