import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button
} from '@mui/material';

const DialogDefinirAlerta = (props) => {
  const {
    openDefinir,
    setOpenDefinir,
    idAlerta,
    setIdAlerta
  } = props;

  const cancelar = () => {
    setOpenDefinir(false);
    setIdAlerta('');
  }

  const enviar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);
    console.log({
      id: idAlerta,
      ...inputObject
    })
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
            name="quantidade"
            margin="dense"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelar}>
          Cancelar
        </Button>
        <Button type="submit" form="quantidade-alerta">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDefinirAlerta;