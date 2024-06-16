import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilmsData } from '../redux/films/selectors';
import {
  Header,
  Group,
  List,
  ContentCard,
  Pagination,
  FormItem,
  ChipsSelect,
  Slider,
  Button,
  Div,
  Link,
  Title,
} from '@vkontakte/vkui';
import { fetchFilms, fetchFilmsProps } from '../redux/films/asyncActions';
import { useAppDispatch } from '../redux/store';
import { selectGenresData } from '../redux/genres/selectors';
import { fetchGenres } from '../redux/genres/asyncActions';

type Slider = [number, number];

const Home = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(5);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedYears, setSelectedYears] = React.useState<Slider>([
    1990,
    new Date().getFullYear(),
  ]);
  const [selectedRating, setSelectedRating] = React.useState<Slider>([0, 10]);

  const { filmItems, filmStatus } = useSelector(selectFilmsData);
  const { genreItems } = useSelector(selectGenresData);

  const currentLimit = 50;
  const fetchProps = {
    page: currentPage,
    limit: currentLimit,
    selectedYears: selectedYears,
    selectedRating: selectedRating,
    selectedGenres: selectedGenres,
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([1990, new Date().getFullYear()]);
    setSelectedRating([0, 10]);
    const fetchProps = {
      page: currentPage,
      limit: currentLimit,
      selectedYears: selectedYears,
      selectedRating: selectedRating,
      selectedGenres: selectedGenres,
    };
    dispatch(fetchFilms(fetchProps));
  };

  const fetchFilterFilms = () => {
    const fetchProps = {
      page: currentPage,
      limit: currentLimit,
      selectedYears: selectedYears,
      selectedRating: selectedRating,
      selectedGenres: selectedGenres,
    };
    dispatch(fetchFilms(fetchProps));
  };

  const handleChange = React.useCallback((page: number) => {
    const fetchProps = {
      page: page,
      limit: currentLimit,
      selectedYears: selectedYears,
      selectedRating: selectedRating,
      selectedGenres: selectedGenres,
    };
    setCurrentPage(page);
    getFilms(fetchProps);
  }, []);

  const getFilms = async (fetchProps: fetchFilmsProps) => {
    dispatch(fetchFilms(fetchProps));
  };
  const getGenres = async () => {
    dispatch(fetchGenres());
  };

  React.useEffect(() => {
    getFilms(fetchProps);
    getGenres();
  }, []);

  if (filmStatus === 'error') {
    return (
      <List>
        <Header mode="secondary">Ошибка</Header>
        <Group className="filters">
          <Title style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
            Произошла ошибка при запросе данных с сервера
          </Title>
        </Group>
      </List>
    );
  } else if (filmStatus === 'loading') {
    return (
      <List>
        <Header mode="secondary">Загрузка</Header>
        <Group className="filters">
          <Title style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
            Идет загрузка данных с сервера
          </Title>
        </Group>
      </List>
    );
  } else if (filmItems.length === 0) {
    return (
      <List>
        <Header mode="secondary">Сожалеем</Header>
        <Group className="filters">
          <Button onClick={resetFilters} mode="secondary" style={{ marginLeft: 15, marginTop: 15 }}>
            Вернуться к началу
          </Button>
          <Title style={{ textAlign: 'center', marginTop: 7, marginBottom: 50 }}>
            К сожалению фильмов, которые вы ищите, не нашлось(
          </Title>
        </Group>
      </List>
    );
  }
  return (
    <List>
      <Header mode="secondary">Фильтры</Header>
      <Group className="filters">
        <FormItem htmlFor="genres" top="Выберите жанры">
          <ChipsSelect
            id="genres"
            value={selectedGenres}
            onChange={setSelectedGenres}
            options={genreItems}
            placeholder="Не выбраны"
            emptyText="Совсем ничего не найдено"
            selectedBehavior="hide"
            closeAfterSelect={false}
          />
        </FormItem>
        <FormItem top="Выберите года">
          <Slider
            id="year"
            value={selectedYears}
            min={1990}
            max={new Date().getFullYear()}
            withTooltip
            multiple
            step={1}
            onChange={(val) => {
              setSelectedYears(val);
            }}
            defaultValue={[1990, new Date().getFullYear()]}
          />
        </FormItem>
        <FormItem top="Выберите рейтинг">
          <Slider
            id="rating"
            value={selectedRating}
            min={0}
            max={10}
            withTooltip
            multiple
            step={0.1}
            onChange={(val) => {
              setSelectedRating(val);
            }}
            defaultValue={[0, 10]}
          />
        </FormItem>
        <Div>
          <Button onClick={fetchFilterFilms} style={{ marginRight: 15 }} mode="primary">
            Отфильтровать
          </Button>
          <Button onClick={resetFilters} mode="secondary">
            Сбросить фильтры
          </Button>
        </Div>
      </Group>
      <Header mode="secondary">Список фильмов</Header>
      <Group className="film__group">
        {filmItems.map((item) => (
          <Link key={item.id} href={`/product-card/${item.id}`}>
            <ContentCard
              className="film-card"
              src={item.poster}
              alt="poster"
              header={item.name}
              text={item.year}
              caption={item.rating}
            />
          </Link>
        ))}
      </Group>
      <Pagination
        className="pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handleChange}
      />
    </List>
  );
};

export default Home;
