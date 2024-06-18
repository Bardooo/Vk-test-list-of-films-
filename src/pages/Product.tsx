import { useParams } from 'react-router-dom';
import React from 'react';

import FilmCard from '../components/FilmCard';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { Button, Group, Header, List, Link, Div } from '@vkontakte/vkui';
import { fetchFilm } from '../redux/film/asyncActions';
import { selectFilmData } from '../redux/film/selectors';

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
