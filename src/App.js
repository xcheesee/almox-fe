import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
import RecusaTranferencia from './Pages/Transferencia/recusaTransferencia';
import NovaSaida from './Pages/Saida/NovaSaida';
import Saida from './Pages/Saida';
import { AuthProvider } from './common/utils/hooks';
import ProtectedRoute from './components/ProtectedRoute';
import Margens from './components/Margens';

//Hooks de query, cache, fetching/refetching, etc => https://tanstack.com/query/v4/

function App() {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  return (
    <AuthProvider>
        <Margens>
      <Routes>
        <Route path="/" element={ <Login /> } />

        <Route path="/principal" element={ <ProtectedRoute><Principal /></ProtectedRoute> } />

        <Route path="/entrada" element={ <ProtectedRoute><Entrada /></ProtectedRoute> } />

        <Route path="/entrada/nova-entrada" element={ <ProtectedRoute><NovaEntrada /></ProtectedRoute> } />

        <Route path="/ordemservico" element={ <ProtectedRoute><Ordem /></ProtectedRoute> } />

        <Route path="/ordemservico/nova-ordem" element={ <ProtectedRoute><NovaOrdem /></ProtectedRoute> } />

        <Route path="/saida" element={ <ProtectedRoute><Saida /></ProtectedRoute> } />

        <Route path="/saida/nova-saida" element={ <ProtectedRoute><NovaSaida /></ProtectedRoute> } />

        <Route path="/saida/:id/baixa" element={ <ProtectedRoute><Baixa setSnackbar={setSnackbar} /></ProtectedRoute> } />

        <Route path="/inventario" element={ <ProtectedRoute><PaginaInventario /></ProtectedRoute> } />

        <Route path="/transferencia" element={ <ProtectedRoute><Transferencia /></ProtectedRoute>} />

        <Route path="/transferencia/nova-tranferencia" element={ <ProtectedRoute><NovaTransferencia /></ProtectedRoute>} />

        <Route path="/transferencia/recusa-transferencia/:id" element={ <ProtectedRoute><RecusaTranferencia /></ProtectedRoute>} />

        <Route path="/ocorrencia" element={ <ProtectedRoute><Ocorrencia /></ProtectedRoute>} />

        <Route path="/ocorrencia/nova-ocorrencia" element={ <ProtectedRoute><NovaOcorrencia /></ProtectedRoute>} />

        <Route path="*" element={ <Pagina404 /> } />
      </Routes>

      <SnackbarAlert
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
        </Margens>
    </AuthProvider>
  );
}

export default App;
