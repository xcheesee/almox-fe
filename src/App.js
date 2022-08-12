import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Principal from './Pages/Principal';
import Entrada from './Pages/Entrada';
import Ordem from './Pages/Ordem';
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
    </Routes>
  );
}

export default App;
