import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
  CircularProgress,
  alertClasses
} from '@mui/material';
import { snackbarAtom } from '../../atomStore';
import { useSetAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddAlerta } from '../../common/utils';

const DialogDefinirAlerta = (props) => {
  const queryClient = useQueryClient()
  const {
    openDefinir,
    setOpenDefinir,
    idAlerta,
    setIdAlerta,
    registro,
  } = props;

  const mutation = useMutation(alertaData => AddAlerta(alertaData, idAlerta),
    { 
      onSuccess: async (dataRes) => {
        setSnackbar({
          open: true, 
          severity: 'success', 
          message: `Alerta definido com sucesso!`
        });

        setOpenDefinir(false);
        return await queryClient.invalidateQueries(['itemsAcabando'], {
          refetchType: 'all'
        })
      }, 
      onError: async (res) => {
        setSnackbar({
          open: true, 
          severity: 'error', 
          message: `Não foi possível definir o alerta ${res}`
        });
      }
    })

  const setSnackbar = useSetAtom(snackbarAtom)
  const cancelar = () => {
    setOpenDefinir(false);
    setIdAlerta('');
  }

  const enviar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);

    mutation.mutate({...registro, ...inputObject})
  }

  return (
    <Dialog open={openDefinir} fullWidth>
      <DialogTitle>
        Definir alerta para o item #{`${idAlerta}`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="quantidade-alerta"
          onSubmit={(e) => {
            enviar(e)
            queryClient.invalidateQueries(['itemsAcabando'])
            queryClient.refetchQueries(['itemsAcabando'], {stale: 'true'})
          }}
        >
          <TextField
            label="Quantidade"
            defaultValue={registro.qtd_alerta}
            name="qtd_alerta"
            margin="dense"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelar}>
          Cancelar
        </Button>
        <Button type="submit" form="quantidade-alerta" disabled={mutation.isLoading}>
          {mutation.isLoading
            ? <CircularProgress size="1rem" className="mr-2" />
            : ""
          }
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDefinirAlerta;