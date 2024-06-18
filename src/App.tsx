import { Route, Routes } from 'react-router-dom';
import './scss/App.scss';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Product from './pages/Product';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="film/:id" element={<Product />} />
      </Route>
    </Routes>
  );
};

export default App;
