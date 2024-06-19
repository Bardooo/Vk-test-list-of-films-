import React, { useCallback } from 'react';
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
import { fetchGenres } from '../redux/genres/asyncActions';
import { Status } from '../redux/films/types';
import { Icon12Add } from '@vkontakte/icons';
import Filters from '../components/Filters';

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
    dispatch(fetchFilms(fetchProps));
  };

  const handleOnPagination = useCallback((page: number) => {
    const props = { ...fetchProps, page };
    setCurrentPage(page);
    getFilms(props);
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
        <Group className="error-filters">
          <Title className="error-filters__title">
            Произошла ошибка при запросе данных с сервера
          </Title>
        </Group>
      </List>
    );
  }
  if (filmStatus === Status.LOADING) {
    return (
      <>
        <Filters
          fetchFilterFilms={fetchFilterFilms}
          resetFilters={resetFilters}
          selectedGenres={selectedGenres}
          selectedYears={selectedYears}
          selectedRating={selectedRating}
          setSelectedGenres={setSelectedGenres}
          setSelectedYears={setSelectedYears}
          setSelectedRating={setSelectedRating}
        />
        <List>
          <Header mode="secondary">Загрузка</Header>
          <Group className="loading-filters">
            <Title className="loading-filters__main">Идет загрузка данных с сервера</Title>
          </Group>
        </List>
      </>
    );
  }
  if (filmItems.length === 0) {
    return (
      <List>
        <Header mode="secondary">Сожалеем</Header>
        <Group className="empty-filters">
          <Button onClick={resetFilters} mode="secondary">
            Вернуться к началу
          </Button>
          <Title className="empty-filters__title">
            К сожалению фильмов, которые вы ищите, не нашлось(
          </Title>
        </Group>
      </List>
    );
  }
  return (
    <>
      <Filters
        fetchFilterFilms={fetchFilterFilms}
        resetFilters={resetFilters}
        selectedGenres={selectedGenres}
        selectedYears={selectedYears}
        selectedRating={selectedRating}
        setSelectedGenres={setSelectedGenres}
        setSelectedYears={setSelectedYears}
        setSelectedRating={setSelectedRating}
      />
      <List>
        <Header mode="secondary">Список фильмов</Header>
        <Group className="film__group">
          {filmItems.map((item) => (
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
                      className="film-card__button"
                      appearance="accent"
                      before={<Icon12Add />}
                    />
                  </div>
                }
              />
            </Link>
          ))}
        </Group>
        <Pagination
          className="pagination"
          currentPage={currentPage}
          totalPages={pages}
          onChange={handleOnPagination}
        />
      </List>
    </>
  );
};

export default Home;
