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
import { useAtom } from 'jotai';
import { snackbarAtom } from './atomStore';

function App() {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);
  const [locais, setLocais] = useState();
  const [carregandoLocais, setCarregandoLocais] = useState(true);
  const [itemsAcabando, setItemsAcabando] = useState([]);

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
          <Auth itemsAcabando={itemsAcabando}>
            <Login />
          </Auth>
        } />

        <Route path="/principal" element={
          <Auth itemsAcabando={itemsAcabando}>
            <Principal />
          </Auth>
        } />

        <Route path="/entrada" element={
          <Auth itemsAcabando={itemsAcabando}>
            <Entrada
              locais={locais}
              carregandoLocais={carregandoLocais}
            />
          </Auth>
        } />

        <Route path="/entrada/nova-entrada" element={
          <Auth itemsAcabando={itemsAcabando}>
            <NovaEntrada 
              locais={locais}
              carregandoLocais={carregandoLocais}
            />
          </Auth>
        } />

        <Route path="/ordemservico" element={
          <Auth itemsAcabando={itemsAcabando}>
            <Ordem 
              locais={locais}
              carregandoLocais={carregandoLocais}
            />
          </Auth>
        } />

        <Route path="/ordemservico/nova-ordem" element={
          <Auth itemsAcabando={itemsAcabando}>
            <NovaOrdem 
              locais={locais}
              carregandoLocais={carregandoLocais}
            />
          </Auth>
        } />

        <Route path="/ordemservico/baixa/:id" element={
          <Auth itemsAcabando={itemsAcabando}>
            <Baixa setSnackbar={setSnackbar} />
          </Auth>
        } />

        <Route path="/inventario" element={
          <Auth itemsAcabando={itemsAcabando}>
            <PaginaInventario />
          </Auth>
        } />

        <Route path="*" element={
          <Auth itemsAcabando={itemsAcabando}>
            <Pagina404 />
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
