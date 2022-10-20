import { useEffect } from 'react';
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
import { getItemsAcabando } from './common/utils';
import { useAtom, useSetAtom } from 'jotai';
import { itemsAcabandoAtom, snackbarAtom } from './atomStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        <Auth >
          <Routes>
            <Route path="/" element={
                <Login />
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

            <Route path="/ordemservico/baixa/:id" element={
                <Baixa setSnackbar={setSnackbar} />
            } />

            <Route path="/inventario" element={
                <PaginaInventario />
            } />

            <Route path="*" element={
                <Pagina404 />
            } />
          </Routes>

          <SnackbarAlert
            snackbar={snackbar}
            setSnackbar={setSnackbar}
          />
      </Auth >
    </QueryClientProvider>
  );
}

export default App;
