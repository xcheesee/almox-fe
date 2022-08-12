import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Principal from './Pages/Principal';
import Entrada from './Pages/Entrada';
import Ordem from './Pages/Ordem';
import PaginaInventario from './Pages/PaginaInventario';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/principal" element={
        <Principal />
      } />

      <Route path="/entrada" element={
        <Entrada />
      } />

      <Route path="/ordemservico" element={
        <Ordem />
      } />

      <Route path="/inventario" element={
        <PaginaInventario />
      } />
    </Routes>
  );
}

export default App;
