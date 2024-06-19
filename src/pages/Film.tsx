import { useParams } from 'react-router-dom';
import React from 'react';

import FilmCard from '../components/FilmCard';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { Button, Group, Header, List, Link, Div, Spinner, Title } from '@vkontakte/vkui';
import { fetchFilm } from '../redux/film/asyncActions';
import { selectFilmData } from '../redux/film/selectors';
import { Status } from '../redux/film/types';

const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const filmId = {
    id: Number(id),
  };
  const { film, filmStatus } = useSelector(selectFilmData);

  React.useEffect(() => {
    dispatch(fetchFilm(filmId));
  }, []);

  if (filmStatus === Status.LOADING) {
    return (
      <List>
        <Header mode="secondary">Грузим карточку фильма</Header>
        <Group>
          <Div className="loading-filters">
            <Spinner className="loading-filters__main" size="large" />
          </Div>
        </Group>
      </List>
    );
  }

  if (filmStatus === Status.ERROR) {
    return (
      <List>
        <Header mode="secondary">Ошибка</Header>
        <Group className="error-filters">
          <Title className="error-filters__title">
            Произошла ошибка при запросе данных с сервера
          </Title>
        </Group>
      </List>
    );
  }

  return (
    <List>
      <Header mode="secondary">Карточка фильма</Header>
      <Group>
        <Div>
          <Link href="/">
            <Button>Вернуться назад</Button>
          </Link>
        </Div>
        <FilmCard film={film} />
      </Group>
    </List>
  );
};

export default Product;
