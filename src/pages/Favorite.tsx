import { Icon16Favorite } from '@vkontakte/icons';
import { Button, ContentCard, Group, Header, Link, List, SimpleCell } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';

const Favorite = () => {
  const [items, setItems] = useState([]);

  const getFavoritesFromLS = () => {
    const items = [];
    const data = localStorage.getItem('favorites');
    const favorites = data ? JSON.parse(data) : [];
    for (let key in favorites) {
      items.push(favorites[key]);
    }
    setItems(items);
  };

  const deleteFavorite = (e, item) => {
    e.preventDefault();
    setItems((prevState) => {
      const filteredFilms = prevState.filter((film) => film.id !== item.id);
      const json = JSON.stringify(filteredFilms);
      localStorage.setItem('favorites', json);
      return filteredFilms;
    });
  };

  useEffect(() => {
    getFavoritesFromLS();
  }, []);

  if (!items.length) {
    return (
      <>
        <Header size="large">У вас нет избранных фильмов</Header>
        <SimpleCell>
          <Link href="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </SimpleCell>
      </>
    );
  }

  return (
    <List>
      <Header mode="primary">"Избранные" фильмы</Header>
      <Group className="favorite">
        <SimpleCell>
          <Link href="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </SimpleCell>
        <Group className="favorite-group">
          {items.map((item) => (
            <Link key={item.id} href={`/film/${item.id}`}>
              <ContentCard
                className="film-card"
                src={item.poster}
                alt="poster"
                header={<div className="film-card__header">{item.name}</div>}
                text={<div className="film-card__text">{item.year}</div>}
                caption={
                  <div className="film-card__bottom">
                    <div className="film-card__caption">{item.rating}</div>
                    <Button
                      onClick={(e) => deleteFavorite(e, item)}
                      className="film-card__button"
                      appearance="accent"
                      before={<Icon16Favorite />}
                    />
                  </div>
                }
              />
            </Link>
          ))}
        </Group>
      </Group>
    </List>
  );
};

export default Favorite;
