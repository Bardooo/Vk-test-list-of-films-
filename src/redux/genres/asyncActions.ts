import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Genre } from './types'

const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'X-API-KEY': 'Z0YAZQF-BWQM317-K2MS6WX-SWA58YT'}
};

export const fetchGenres = createAsyncThunk<Genre[]>(
  'genres/fetchgenresStatus',
  async () => {
    const { data } = await axios.get(
      'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
      options,
    );
    const transformedData = data.map((item: {name: string, slug: string}) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
    return transformedData;
  }
);
