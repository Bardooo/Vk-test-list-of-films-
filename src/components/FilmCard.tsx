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
          <Title className="film-page__title" style={{ marginBottom: 25 }}>
            {film.name}
          </Title>
          {film.description === null ? (
            <Text style={{ marginBottom: 30 }}>Описания пока нет</Text>
          ) : (
            <Text style={{ marginBottom: 30 }}>{film.description}</Text>
          )}
        </div>
        <div>
          <Text style={{ marginBottom: 5, fontSize: 20 }}>Жанры: </Text>
          {film.genres.map((el, index) => (
            <Text key={index}>{el.name}</Text>
          ))}
          <SimpleCell style={{ padding: 0, marginTop: 50 }} after={<p>{film.rating}</p>}>
            <p className="film-page__year">год: {film.year}</p>
          </SimpleCell>
        </div>
      </div>
    </Div>
  );
};

export default FilmCard;
