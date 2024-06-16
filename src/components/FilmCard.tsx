import { Group, List, SimpleCell, Title, Text } from '@vkontakte/vkui';
import { Film } from '../redux/films/types';

const FilmCard: React.FC<Film> = (film) => {
  return (
    <>
      <List>
        <Group className="film-card">
          <img className="film-card__img" src={film.poster} alt="постер" />
          <div className="film-card__main">
            <Title className="film-card__title">{film.name}</Title>
            <Text style={{}}>{film.description}</Text>
            <SimpleCell after={<p>рейтинг: {film.rating}</p>}>год: {film.year}</SimpleCell>
            <Text>Жанры: </Text>
          </div>
        </Group>
      </List>
    </>
  );
};

export default FilmCard;
