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
  usePlatform,
  List,
  ContentCard,
  Pagination,
  FormItem,
  ChipsSelect,
  Slider,
  Button,
  Div,
} from '@vkontakte/vkui';
import React from 'react';
import { fetchFilms, fetchFilmsProps } from './redux/films/asyncActions';
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

  const { filmItems, filmStatus } = useSelector(selectFilmsData);
  const { genreItems } = useSelector(selectGenresData);

  const fetchProps = {
    page: currentPage,
    selectedYears: selectedYears,
    selectedRating: selectedRating,
    selectedGenres: selectedGenres,
  };

  const fetchFilterFilms = () => {
    const fetchProps = {
      page: currentPage,
      selectedYears: selectedYears,
      selectedRating: selectedRating,
      selectedGenres: selectedGenres,
    };
    dispatch(fetchFilms(fetchProps));
  };

  const handleChange = React.useCallback((page: number) => {
    const fetchProps = {
      page: page,
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
                  <FormItem top="Выберите года">
                    <Slider
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
                    <Button onClick={fetchFilterFilms} mode="primary">
                      Отфильтровать
                    </Button>
                  </Div>
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
