import { SimpleCell, Title, Text, Div } from '@vkontakte/vkui';
import { Film } from '../redux/film/types';

type FilmCardProps = {
  film: Film;
};

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
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
        </div>
      </div>
    </Div>
  );
};

export default FilmCard;
