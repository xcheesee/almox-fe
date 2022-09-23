import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { headers } from '../../common/utils';

const DialogDefinirAlerta = (props) => {
  const {
    openDefinir,
    setOpenDefinir,
    idAlerta,
    setIdAlerta,
    registro,
    setSnackbar
  } = props;

  const [carregando, setCarregando] = useState(false);

  const cancelar = () => {
    setOpenDefinir(false);
    setIdAlerta('');
  }

  const enviar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);
    
    const url = `${process.env.REACT_APP_API_URL}/inventario/${idAlerta}`;
    const options = {
      method: 'PUT',
      headers: {...headers, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...registro, 
        ...inputObject
      })
    };

    setCarregando(true);

    fetch(url, options)
      .then(res => {
        if (res.ok) {
          setSnackbar({
            open: true, 
            severity: 'success', 
            message: `Alerta definido com sucesso!`
          });
          setOpenDefinir(false);
          setCarregando(false);
          return(res.json());
        } else {
          setSnackbar({
            open: true, 
            severity: 'error', 
            message: `Não foi possível definir o alerta (Erro ${res.status})`
          });
          setCarregando(false);
        }
      })
      .catch(err => console.log(err));
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
          onSubmit={enviar}
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