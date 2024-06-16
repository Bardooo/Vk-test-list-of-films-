import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'HNNXBS0-MT3MQXW-PZ7C4BW-FC6PRH8' },
};

export type fetchFilmsProps = {
  page: number,
  limit: number,
  selectedYears: any, 
  selectedRating: any,
  selectedGenres: any
}

export const fetchFilms = createAsyncThunk<Film[], fetchFilmsProps>(
  'films/fetchfilmsStatus',
  async ({page, limit, selectedYears, selectedRating, selectedGenres}) => {
    if (selectedYears.length === new Date().getFullYear() - 1990 && selectedRating.length === 100 && selectedGenres.length === 0) {
      const { data } = await axios.get(
        `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}`,
        options,
      );
      const transformedData = data.docs.map((item) => {
        return {
          id: item.id,
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
      let url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}${year}${rating}${genre}`
      const { data } = await axios.get(
        url,
        options,
      );
      const transformedData = data.docs.map((item) => {
        return {
          id: item.id,
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
