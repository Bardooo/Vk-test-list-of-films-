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
  ButtonGroup,
} from '@vkontakte/vkui';
import { fetchFilms, fetchFilmsProps } from '../redux/films/asyncActions';
import { useAppDispatch } from '../redux/store';
import { selectGenresData } from '../redux/genres/selectors';
import { fetchGenres } from '../redux/genres/asyncActions';
import { Status } from '../redux/films/types';

type SliderFilters = [number, number];

const LIMIT = 50;

const Home = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedYears, setSelectedYears] = React.useState<SliderFilters>([
    1990,
    new Date().getFullYear(),
  ]);
  const [selectedRating, setSelectedRating] = React.useState<SliderFilters>([0, 10]);

  const { filmItems, pages, filmStatus } = useSelector(selectFilmsData);
  const { genreItems } = useSelector(selectGenresData);

  const fetchProps = {
    page: currentPage,
    limit: LIMIT,
    selectedYears: selectedYears,
    selectedRating: selectedRating,
    selectedGenres: selectedGenres,
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([1990, new Date().getFullYear()]);
    setSelectedRating([0, 10]);

    const fetchResetProps = {
      page: 1,
      limit: LIMIT,
      selectedYears: [1990, 2024],
      selectedRating: [0, 10],
      selectedGenres: [],
    };

    dispatch(fetchFilms(fetchResetProps));
  };

  const fetchFilterFilms = () => {
    const fetchProps = {
      page: currentPage,
      limit: LIMIT,
      selectedYears: selectedYears,
      selectedRating: selectedRating,
      selectedGenres: selectedGenres,
    };
    dispatch(fetchFilms(fetchProps));
  };

  const handleChange = React.useCallback((page: number) => {
    const fetchProps = {
      page: page,
      limit: LIMIT,
      selectedYears: selectedYears,
      selectedRating: selectedRating,
      selectedGenres: selectedGenres,
    };
    setCurrentPage(page);
    getFilms(fetchProps);
  }, []);

  const getFilms = (fetchProps: fetchFilmsProps) => {
    dispatch(fetchFilms(fetchProps));
  };
  const getGenres = () => {
    dispatch(fetchGenres());
  };

  React.useEffect(() => {
    getFilms(fetchProps);
    getGenres();
  }, []);

  if (filmStatus === Status.ERROR) {
    return (
      <List>
        <Header mode="secondary">Ошибка</Header>
        <Group className="filters">
          <Title style={{ textAlign: 'center', marginTop: 80, marginBottom: 80 }} className="title">
            Произошла ошибка при запросе данных с сервера
          </Title>
        </Group>
      </List>
    );
  }
  if (filmStatus === Status.LOADING) {
    return (
      <>
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
            <ButtonGroup mode="vertical" gap="m">
              <Button onClick={fetchFilterFilms} mode="primary">
                Отфильтровать
              </Button>
              <Button onClick={resetFilters} mode="secondary">
                Сбросить фильтры
              </Button>
            </ButtonGroup>
          </Div>
        </Group>
        <List>
          <Header mode="secondary">Загрузка</Header>
          <Group className="filters">
            <Title
              style={{ textAlign: 'center', marginTop: 80, marginBottom: 80 }}
              className="title">
              Идет загрузка данных с сервера
            </Title>
          </Group>
        </List>
      </>
    );
  }
  if (filmItems.length === 0) {
    return (
      <List>
        <Header mode="secondary">Сожалеем</Header>
        <Group className="filters">
          <Button onClick={resetFilters} mode="secondary">
            Вернуться к началу
          </Button>
          <Title style={{ textAlign: 'center', marginTop: 50, marginBottom: 85 }} className="title">
            К сожалению фильмов, которые вы ищите, не нашлось(
          </Title>
        </Group>
      </List>
    );
  }
  return (
    <>
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
          <ButtonGroup mode="vertical" gap="m">
            <Button onClick={fetchFilterFilms} mode="primary">
              Отфильтровать
            </Button>
            <Button onClick={resetFilters} mode="secondary">
              Сбросить фильтры
            </Button>
          </ButtonGroup>
        </Div>
      </Group>
      <List>
        <Header mode="secondary">Список фильмов</Header>
        <Group className="film__group">
          {filmItems.map((item) => (
            <Link key={item.id} href={`/film/${item.id}`}>
              <ContentCard
                className="film-card"
                src={item.poster}
                alt="poster"
                header={<div className="content-card-header">{item.name}</div>}
                text={<div className="content-card-text">{item.year}</div>}
                caption={<div className="content-card-caption">{item.rating}</div>}
              />
            </Link>
          ))}
        </Group>
        <Pagination
          className="pagination"
          currentPage={currentPage}
          totalPages={pages}
          onChange={handleChange}
        />
      </List>
    </>
  );
};

export default Home;
