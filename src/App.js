import { useEffect, useState } from 'react';
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
import Pagina404 from './Pages/Pagina404';
import { Routes, Route, useLocation } from 'react-router';
import SnackbarAlert from './components/SnackbarAlert';
import { getLocais, getItemsAcabando } from './common/utils';
import { useAtom, useSetAtom } from 'jotai';
import { carregandoLocaisAtom, itemsAcabandoAtom, locaisAtom, snackbarAtom } from './atomStore';

function App() {
  const setItemsAcabando = useSetAtom(itemsAcabandoAtom);
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);
  const setLocais = useSetAtom(locaisAtom);
  const setCarregandoLocais = useSetAtom(carregandoLocaisAtom);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      getLocais(setCarregandoLocais, setLocais);
      getItemsAcabando(setItemsAcabando);
    }
  }, [location.pathname])

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Auth >
            <Login />
          </Auth >
        } />

        <Route path="/principal" element={
          <Auth >
            <Principal />
          </Auth >
        } />

        <Route path="/entrada" element={
          <Auth >
            <Entrada />
          </Auth >
        } />

        <Route path="/entrada/nova-entrada" element={
          <Auth >
            <NovaEntrada />
          </Auth >
        } />

        <Route path="/ordemservico" element={
          <Auth >
            <Ordem />
          </Auth >
        } />

        <Route path="/ordemservico/nova-ordem" element={
          <Auth >
            <NovaOrdem />
          </Auth >
        } />

        <Route path="/ordemservico/baixa/:id" element={
          <Auth >
            <Baixa setSnackbar={setSnackbar} />
          </Auth >
        } />

        <Route path="/inventario" element={
          <Auth >
            <PaginaInventario />
          </Auth >
        } />

        <Route path="*" element={
          <Auth >
            <Pagina404 />
          </Auth >
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
