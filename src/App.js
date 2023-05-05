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
import { Routes, Route } from 'react-router';
import SnackbarAlert from './components/SnackbarAlert';
import { useAtom } from 'jotai';
import { snackbarAtom } from './atomStore';
import Transferencia from './Pages/Transferencia';
import Ocorrencia from './Pages/Ocorrencia';
import NovaOcorrencia from './Pages/Ocorrencia/novaOcorrencia';
import NovaTransferencia from './Pages/Transferencia/novaTransferencia';

//Hooks de query, cache, fetching/refetching, etc => https://tanstack.com/query/v4/

function App() {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  return (
    <Auth >
      <Routes>
        <Route path="/" element={ <Login /> } />

        <Route path="/principal" element={ <Principal /> } />

        <Route path="/entrada" element={ <Entrada /> } />

        <Route path="/entrada/nova-entrada" element={ <NovaEntrada /> } />

        <Route path="/ordemservico" element={ <Ordem /> } />

        <Route path="/ordemservico/nova-ordem" element={ <NovaOrdem /> } />

        <Route path="/ordemservico/baixa/:id" element={ <Baixa setSnackbar={setSnackbar} /> } />

        <Route path="/inventario" element={ <PaginaInventario /> } />

        <Route path="/transferencia" element={ <Transferencia />} />

        <Route path="/transferencia/nova-tranferencia" element={ <NovaTransferencia />} />

        <Route path="/ocorrencia" element={ <Ocorrencia />} />

        <Route path="/ocorrencia/nova-ocorrencia" element={ <NovaOcorrencia />} />

        <Route path="*" element={ <Pagina404 /> } />
      </Routes>

      <SnackbarAlert
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
    </Auth >
  );
}

export default App;
