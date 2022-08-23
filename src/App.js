import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Auth from './components/Auth';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Entrada from './pages/Entrada/Entrada';
import NovaEntrada from './pages/Entrada/NovaEntrada';
import Ordem from './pages/Ordem/Ordem';
import NovaOrdem from './pages/Ordem/NovaOrdem';
import Baixa from './pages/Ordem/Baixa';
import PaginaInventario from './pages/PaginaInventario';
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

      <Route path="/ordemservico/baixa/:id" element={
        <Auth>
          <Baixa />
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
