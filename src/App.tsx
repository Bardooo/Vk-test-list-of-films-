import { useSelector } from 'react-redux';
import { selectFilmsData } from './redux/films/selectors';
import './scss/App.scss';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  usePlatform,
  List,
  ContentCard,
  Pagination,
  FormItem,
  ChipsSelect,
} from '@vkontakte/vkui';
import React from 'react';
import { fetchFilms } from './redux/films/asyncActions';
import { useAppDispatch } from './redux/store';
import FilmCard from './components/FilmCard';
import { selectGenresData } from './redux/genres/selectors';
import { fetchGenres } from './redux/genres/asyncActions';

const App = () => {
  const platform = usePlatform();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(5);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [selectedYears, setSelectedYears] = React.useState([]);
  const [selectedRating, setSelectedRating] = React.useState([]);
  const [filters, setFilters] = React.useState();

  const { filmItems, filmStatus } = useSelector(selectFilmsData);
  const { genreItems } = useSelector(selectGenresData);

  const getYears = () => {
    const data = [];
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      data.push({
        value: i,
        label: i,
      });
    }
    return data;
  };
  const years = getYears();

  const getRating = () => {
    const data = [];
    for (let i = 0.1; i <= 10; i += 0.1) {
      const value = parseFloat(i.toFixed(1));
      data.push({
        value: value,
        label: value,
      });
    }
    return data;
  };
  const rating = getRating();

  const handleChange = React.useCallback((page: number) => {
    setCurrentPage(page);
    getFilms(page);
  }, []);

  const getFilms = async (currentPage: number) => {
    dispatch(fetchFilms(currentPage));
  };
  const getGenres = async () => {
    dispatch(fetchGenres());
  };

  React.useEffect(() => {
    getFilms(currentPage);
    getGenres();
  }, []);

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>Тестовое задание</PanelHeader>
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
                  <FormItem htmlFor="years" top="Выберите года">
                    <ChipsSelect
                      id="years"
                      value={selectedYears}
                      onChange={setSelectedYears}
                      options={years}
                      placeholder="Не выбраны"
                      emptyText="Совсем ничего не найдено"
                      selectedBehavior="hide"
                      closeAfterSelect={false}
                    />
                  </FormItem>
                  <FormItem htmlFor="rating" top="Выберите рейтинг">
                    <ChipsSelect
                      id="rating"
                      value={selectedRating}
                      onChange={setSelectedRating}
                      options={rating}
                      placeholder="Не выбраны"
                      emptyText="Совсем ничего не найдено"
                      selectedBehavior="hide"
                      closeAfterSelect={false}
                    />
                  </FormItem>
                </Group>
                <Header mode="secondary">Список фильмов</Header>
                <Group className="film__group">
                  {filmItems.map((item, index) => (
                    <ContentCard
                      key={index}
                      className="film-card"
                      src={item.poster}
                      alt="poster"
                      header={item.name}
                      text={item.year}
                      caption={item.rating}
                    />
                  ))}
                </Group>
                <Pagination
                  className="pagination"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={handleChange}
                />
              </List>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
