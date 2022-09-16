import { useState } from 'react';
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
import Baixa from './Pages/Ordem/Baixa';
import PaginaInventario from './Pages/PaginaInventario';
import { Routes, Route } from 'react-router';
import SnackbarAlert from './components/SnackbarAlert';

function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: 'Sucesso!'
  });

  return (
    <>
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
            <Entrada
              setSnackbar={setSnackbar}
            />
          </Auth>
        } />

        <Route path="/entrada/nova-entrada" element={
          <Auth>
            <NovaEntrada setSnackbar={setSnackbar} />
          </Auth>
        } />

        <Route path="/ordemservico" element={
          <Auth>
            <Ordem 
              setSnackbar={setSnackbar}
            />
          </Auth>
        } />

        <Route path="/ordemservico/nova-ordem" element={
          <Auth>
            <NovaOrdem setSnackbar={setSnackbar} />
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

      <SnackbarAlert
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
    </>
  );
}

export default App;
