import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
        <Principal />
      } />

      <Route path="/principal" element={
        <Principal />
      } />

      <Route path="/entrada" element={
        <Entrada />
      } />

      <Route path="/entrada/nova-entrada" element={
        <NovaEntrada />
      } />

      <Route path="/ordemservico" element={
        <Ordem />
      } />

      <Route path="/ordemservico/nova-ordem" element={
        <NovaOrdem />
      } />

      <Route path="/inventario" element={
        <PaginaInventario />
      } />
    </Routes>
  );
}

export default App;
