import App from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AdaptivityProvider>
  </ConfigProvider>,
);
