import { Group, SimpleCell } from '@vkontakte/vkui';

type FilmCardProps = {
  name: string;
  year: number;
  rating: number;
  poster: string | null;
};

const FilmCard: React.FC<FilmCardProps> = ({ name, year, rating, poster }) => {
  return (
    <>
      <Group className="film-card">
        <img className="film-card__img" src={poster} alt="постер" />
        <h5 className="film-card__title">{name}</h5>
        <SimpleCell after={<p>рейтинг: {rating}</p>}>год: {year}</SimpleCell>
      </Group>
    </>
  );
};

export default FilmCard;
