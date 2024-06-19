import {
  Button,
  ButtonGroup,
  ChipsSelect,
  Div,
  FormItem,
  Group,
  Header,
  Slider,
} from '@vkontakte/vkui';
import React, { SetStateAction } from 'react';
import { selectGenresData } from '../redux/genres/selectors';
import { useSelector } from 'react-redux';
import { Dispatch } from 'react';

type FiltersProps = {
  fetchFilterFilms: () => void;
  resetFilters: () => void;
  selectedGenres: { name: string }[];
  selectedYears: [number, number];
  selectedRating: [number, number];
  setSelectedGenres: Dispatch<SetStateAction<any[]>>;
  setSelectedYears: Dispatch<SetStateAction<any[]>>;
  setSelectedRating: Dispatch<SetStateAction<any[]>>;
};

const Filters: React.FC<FiltersProps> = ({
  fetchFilterFilms,
  resetFilters,
  selectedGenres,
  selectedYears,
  selectedRating,
  setSelectedGenres,
  setSelectedYears,
  setSelectedRating,
}) => {
  const { genreItems } = useSelector(selectGenresData);

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
            onChange={(val) => setSelectedYears(val)}
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
    </>
  );
};

export default Filters;
