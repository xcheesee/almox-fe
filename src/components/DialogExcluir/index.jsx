import React from 'react';
import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button 
} from '@mui/material';
import { excluiRegistro, primeiraLetraMaiuscula } from '../../common/utils';
import { useAtom, useSetAtom } from 'jotai';
import { excluirAtom, snackbarAtom } from '../../atomStore';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

const DialogExcluir = ({ rota, texto, id, setOpenEditar, setCarregando, tabelaOrigem }) => {
    const QueryClient = useQueryClient()
    const setSnackbar = useSetAtom(snackbarAtom)
    const [openExcluir, setOpenExcluir] = useAtom(excluirAtom)

    const deleteMutation = useMutation( async ({ rota, id }) => {
        setOpenExcluir(false)
        setCarregando(true)
        return await excluiRegistro(rota, id)
    },
    {
        onSuccess:() => {
            setSnackbar({
              open: true,
              severity: 'success',
              message: `${primeiraLetraMaiuscula(texto)} excluido(a) com sucesso!`
            });
            QueryClient.invalidateQueries([tabelaOrigem])
        },
        onError: (res) => {
            setSnackbar({
              open: true,
              severity: 'error',
              message: `Não foi possível excluir (Erro ${res.status})`
            });
        },
        onSettled: () => {
            setOpenEditar(false)
            setCarregando(false)
        }
    } )
    return (
        <Dialog open={openExcluir}>
            <DialogContent>
                <DialogContentText>
                    Deseja realmente excluir a <strong>{texto} #{id}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenExcluir(false)}>
                    Não
                </Button>
                <Button onClick={() => deleteMutation.mutate({rota, id, texto})}>
                    Sim
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogExcluir;