import React from 'react';
import { 
    Box,
    IconButton,
    Tooltip,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    TextField,
    CircularProgress,
} from '@mui/material';
import style from './style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const DialogAltSenh = ({openAltSenha, setOpenAltSenha, carregando, setCarregando, pwRequest, pwRes}) => {
    return(
        <Dialog open={openAltSenha} fullWidth={pwRes === ''} maxWidth="md">
            
           { pwRes === ''
           ? <>
               <DialogTitle>
                    <Tooltip title="Voltar">
                        <IconButton onClick={() => setOpenAltSenha(false)}>
                            <ArrowBackIosNewIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    Alterar Senha
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={style.gridAlt}
                        component="form"
                        id="senha"
                        name="senha"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const formData = Object.fromEntries(new FormData(e.target))
                            console.log(formData)
                            //simulacao de envio
                            const res = await pwRequest(formData)
                            console.log(res)
                            await(new Promise((res, rej) => {
                                setTimeout(() => res('true'), 3000)
                            }))
                            //simulacao de envio
                            setOpenAltSenha(false)
                            setCarregando(false)
                        }}
                    >
                        <TextField
                            label="Email"
                            name="email"
                            id="email"
                            required
                        />
                        <TextField
                            label="Senha Atual"
                            name="password"
                            id="password"
                            required
                        />
                        <TextField
                            label="Nova Senha"
                            name="newpassword"
                            id="newpassword"
                            required
                        />
                        <TextField
                            name="password_confirmation"
                            label="Confirmação Nova Senha"
                            id="password_confirmation"
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' , padding: "0 0 1rem 2rem"}}>
                    <Box sx={{ display: 'flex', margin: '0.5rem', gap: '1rem' }}>
                        <Button
                            type="submit"
                            form="senha"
                            variant="contained" sx={{ gap: '0.5rem' }}
                        >
                            {carregando
                                ? <CircularProgress color="color" size="1rem" />
                                : ''
                            }
                            Salvar
                        </Button>
                    </Box>
                </DialogActions>
           </>
            :<DialogContent>Senha alterada com sucesso!</DialogContent>
            }

        </Dialog>
    )
}

export default DialogAltSenh