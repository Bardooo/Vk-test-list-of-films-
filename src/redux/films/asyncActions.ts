import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Film } from './types'
import React from 'react';

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'X-API-KEY': 'Z0YAZQF-BWQM317-K2MS6WX-SWA58YT' },
};

export type fetchFilmsProps = {
  page: number,
  limit: number,
  selectedYears: any, 
  selectedRating: any,
  selectedGenres: any
}

export type FilmsType = {
  filmItems: Film[]
  pages: number,
}

const transformedData = (data) => {
  const result = {pages: 0, filmItems: []}
  result.filmItems = data.docs.map((item) => {
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
  result.pages = data.pages
  return result;
}

export const fetchFilms = createAsyncThunk<FilmsType, fetchFilmsProps>(
  'films/fetchfilmsStatus',
  async ({page, limit, selectedYears, selectedRating, selectedGenres}) => {
    const emptyFilters = selectedYears.length === new Date().getFullYear() - 1990 && selectedRating.length === 100 && selectedGenres.length === 0
    if (emptyFilters) {
      const { data } = await axios.get(
        `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}`,
        options,
      );
      return transformedData(data)
    } else {
      let year = selectedYears.length === 0 ? '' : `&year=${selectedYears.join('-')}`
      let rating = selectedRating.length === 0 ? '' : `&rating.imdb=${selectedRating.join('-')}`
      let genre = ''
      if (selectedGenres.length !== 0) {
        selectedGenres.map((item: {value: string, label: string}) => {
          genre+=`&genres.name=${item.value}`
        })
      }
      let url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}${year}${rating}${genre}`
      const { data } = await axios.get(
        url,
        options,
      );
      return transformedData(data)
    }
  }
);
