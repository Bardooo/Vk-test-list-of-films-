import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  usePlatform,
  Button,
  Link,
} from '@vkontakte/vkui';

const MainLayout: React.FC = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader
                after={
                  <Link href="/Vk-test_list-of-films/favorite">
                    <Button>Избраннные</Button>
                  </Link>
                }>
                Тестовое задание
              </PanelHeader>
              <Outlet />
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default MainLayout;
