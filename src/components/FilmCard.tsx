import { SimpleCell, Title, Text, Div, Button } from '@vkontakte/vkui';
import { Film } from '../redux/film/types';
import { Icon16Favorite, Icon16FavoriteOutline } from '@vkontakte/icons';
import React, { useState } from 'react';

type FilmCardProps = {
  film: Film;
};

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const [favorites, setFavorites] = useState<{ [key: string]: Film }>({});

  const addFavorite = (e: React.MouseEvent<HTMLElement, MouseEvent>, film: Film) => {
    e.preventDefault();
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (!updatedFavorites[film.id]) {
        updatedFavorites[film.id] = film;
      } else {
        delete updatedFavorites[film.id];
      }
      const json = JSON.stringify(updatedFavorites);
      localStorage.setItem('favorites', json);
      return updatedFavorites;
    });
  };

  return (
    <Div className="film-page">
      <img className="film-page__img" src={film.poster} alt="постер" />
      <div className="film-page__main">
        <div>
          <Title className="film-page__title">{film.name}</Title>
          {film.description === null ? (
            <Text className="film-page__text">Описания пока нет</Text>
          ) : (
            <Text className="film-page__text">{film.description}</Text>
          )}
        </div>
        <div>
          <Text className="film-page__genres">Жанры: </Text>
          {film.genres.map((el, index) => (
            <Text key={index}>{el.name}</Text>
          ))}
          <SimpleCell className="film-page__year" after={<p>{film.rating}</p>}>
            <p>год: {film.year}</p>
          </SimpleCell>
          <Button
            onClick={(e) => addFavorite(e, film)}
            className="film-card__button"
            appearance={favorites[film.id] ? 'overlay' : 'accent'}
            before={favorites[film.id] ? <Icon16Favorite /> : <Icon16FavoriteOutline />}
          />
        </div>
      </div>
    </Div>
  );
};

export default FilmCard;
