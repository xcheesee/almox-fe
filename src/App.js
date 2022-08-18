import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Auth from './components/Auth';
import Login from './Pages/Login';
import Principal from './Pages/Principal';
import Entrada from './Pages/Entrada/Entrada';
import NovaEntrada from './Pages/Entrada/NovaEntrada';
import Ordem from './Pages/Ordem/Ordem';
import NovaOrdem from './Pages/Ordem/NovaOrdem';
import PaginaInventario from './Pages/PaginaInventario';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Auth>
          <Login />
        </Auth>
      } />

      <Route path="/principal" element={
        <Auth>
          <Principal />
        </Auth>
      } />

      <Route path="/entrada" element={
        <Auth>
          <Entrada />
        </Auth>
      } />

      <Route path="/entrada/nova-entrada" element={
        <Auth>
          <NovaEntrada />
        </Auth>
      } />

      <Route path="/ordemservico" element={
        <Auth>
          <Ordem />
        </Auth>
      } />

      <Route path="/ordemservico/nova-ordem" element={
        <Auth>
          <NovaOrdem />
        </Auth>
      } />

      <Route path="/inventario" element={
        <Auth>
          <PaginaInventario />
        </Auth>
      } />
    </Routes>
  );
}

export default App;
