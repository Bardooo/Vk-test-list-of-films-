import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'Z0YAZQF-BWQM317-K2MS6WX-SWA58YT' },
};

export type fetchFilmsProps = {
  page: number,
  selectedYears: any, 
  selectedRating: any,
  selectedGenres: any
}

export const fetchFilms = createAsyncThunk<Film[], fetchFilmsProps>(
  'films/fetchfilmsStatus',
  async ({page, selectedYears, selectedRating, selectedGenres}) => {
    if (selectedYears.length === 0 && selectedRating.length === 0 && selectedGenres.length === 0) {
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
    } else {
      let year = selectedYears.length === 0 ? '' : `&year=${selectedYears.join('-')}`
      let rating = selectedRating.length === 0 ? '' : `&rating.imdb=${selectedRating.join('-')}`
      let genre = ''
      if (selectedGenres.length === 0) {
        genre = ''
      } else {
        selectedGenres.map((item: {value: string, label: string}) => {
          genre+=`&genres.name=${item.value}`
        })
      }
      let url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=50${year}${rating}${genre}`
      const { data } = await axios.get(
        url,
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
  }
);
