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
} from '@vkontakte/vkui';
import React from 'react';
import { fetchFilms } from './redux/films/asyncActions';
import { useAppDispatch } from './redux/store';
import FilmCard from './components/FilmCard';

const App = () => {
  const platform = usePlatform();
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectFilmsData);

  const getFilms = async () => {
    dispatch(fetchFilms());
  };

  React.useEffect(() => {
    getFilms();
  }, []);

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>Тестовое задание</PanelHeader>
              <Header mode="secondary">Список фильмов</Header>
              <List>
                <Group className="film__group">
                  {items.map((item, index) => (
                    <SimpleCell key={index}>
                      <FilmCard
                        name={item.name}
                        year={item.year}
                        rating={item.rating}
                        poster={item.poster}
                      />
                    </SimpleCell>
                  ))}
                </Group>
              </List>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
