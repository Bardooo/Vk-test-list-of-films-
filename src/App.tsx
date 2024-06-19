import { Route, Routes } from 'react-router-dom';
import './scss/App.scss';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Film from './pages/Film';
import Favorite from './pages/Favorite';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="film/:id" element={<Film />} />
        <Route path="favorite" element={<Favorite />} />
      </Route>
    </Routes>
  );
};

export default App;
