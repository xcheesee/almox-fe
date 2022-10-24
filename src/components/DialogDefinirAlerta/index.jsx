import React, { useState } from 'react';
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

const DialogDefinirAlerta = (props) => {
  const queryClient = useQueryClient()
  const {
    openDefinir,
    setOpenDefinir,
    idAlerta,
    setIdAlerta,
    registro,
  } = props;

  const mutation = useMutation(alertaData => {
    const url = `${process.env.REACT_APP_API_URL}/inventario/${idAlerta}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify({
        ...alertaData
      })
    };
    return fetch(url, options)
    .then(res => {
      if (res.ok) {
        setSnackbar({
          open: true, 
          severity: 'success', 
          message: `Alerta definido com sucesso!`
        });
        setOpenDefinir(false);
        // setCarregando(false);
        return(res.json());
      } else {
        setSnackbar({
          open: true, 
          severity: 'error', 
          message: `Não foi possível definir o alerta (Erro ${res.status})`
        });
        // setCarregando(false);
      }
    })
    .catch(err => console.log(err));
  }, { onSuccess: async (dataRes) => {
    return await queryClient.invalidateQueries(['itemsAcabando'], {
      refetchType: 'all'
    })
    // return await queryClient.refetchQueries(['itemsAcabando'])
    // return queryClient.setQueryData(['itemsAcabando'], oldData => [...oldData, dataRes?.data])
  } })

  const [carregando, setCarregando] = useState(false);
  const setSnackbar = useSetAtom(snackbarAtom)
  const cancelar = () => {
    setOpenDefinir(false);
    setIdAlerta('');
  }

  const enviar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);

    
    // const url = `${process.env.REACT_APP_API_URL}/inventario/${idAlerta}`;
    // const options = {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Authorization': localStorage.getItem('access_token')
    //   },
    //   body: JSON.stringify({
    //     ...registro, 
    //     ...inputObject
    //   })
    // };

    // setCarregando(true);

    // fetch(url, options)
    //   .then(res => {
    //     if (res.ok) {
    //       setSnackbar({
    //         open: true, 
    //         severity: 'success', 
    //         message: `Alerta definido com sucesso!`
    //       });
    //       setOpenDefinir(false);
    //       setCarregando(false);
    //       return(res.json());
    //     } else {
    //       setSnackbar({
    //         open: true, 
    //         severity: 'error', 
    //         message: `Não foi possível definir o alerta (Erro ${res.status})`
    //       });
    //       setCarregando(false);
    //     }
    //   })
    //   .catch(err => console.log(err));

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
        <Button type="submit" form="quantidade-alerta" disabled={carregando}>
          {carregando
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