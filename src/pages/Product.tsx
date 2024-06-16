import { useParams } from 'react-router-dom';
import React from 'react';

import FilmCard from '../components/FilmCard';
import { fetchFilms } from '../redux/films/asyncActions';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectFilmsData } from '../redux/films/selectors';
import { Button, Group, Header, List, Link } from '@vkontakte/vkui';
import { Film } from '../redux/films/types';

const Product = () => {
  const [film, setFilm] = React.useState<Film>();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentPage = 1;
  const currentLimit = 200;
  const selectedYears = [];
  const selectedRating = [];
  const selectedGenres = [];
  const fetchProps = {
    page: currentPage,
    limit: currentLimit,
    selectedYears: selectedYears,
    selectedRating: selectedRating,
    selectedGenres: selectedGenres,
  };

  const { filmItems, filmStatus } = useSelector(selectFilmsData);

  React.useEffect(() => {
    dispatch(fetchFilms(fetchProps));
    filmItems.map((item) => {
      if (Number(id) === item.id) {
        setFilm(item);
      }
    });
  }, []);

  return (
    <List>
      <Header mode="secondary">Карточка фильма</Header>
      <Group className="film__group">
        <Link href="/">
          <Button>Вернуться назад</Button>
        </Link>
        {/* <FilmCard film={film} /> */}
      </Group>
    </List>
  );
};

export default Product;
