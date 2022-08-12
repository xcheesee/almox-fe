import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Principal from './Pages/Principal';
import Entrada from './Pages/Entrada';
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
    </Routes>
  );
}

export default App;
