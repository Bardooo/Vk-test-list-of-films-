import { Button, Div, Group, Header, Link, List, SimpleCell } from '@vkontakte/vkui';
import React from 'react';

const Favorite = () => {
  return (
    <List>
      <Header mode="secondary">"Избранные" фильмы</Header>
      <Group>
        <SimpleCell>
          <Link href="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </SimpleCell>
      </Group>
    </List>
  );
};

export default Favorite;
