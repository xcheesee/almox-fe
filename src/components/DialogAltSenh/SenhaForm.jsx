import React from 'react';
import { 
    Box,
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button,
    TextField,
    CircularProgress,
} from '@mui/material';
import style from './style';

const SenhaForm = (props) => {
    const {setOpenAltSenha, carregando, setCarregando, pwRequest, setReqResponse} = props
    
    const sendData = async (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        setCarregando(true)
        console.log(formData)
        const res = await pwRequest(formData)
        setReqResponse(res)
        setCarregando(false)         
    }

    return (
        <>
            <DialogTitle>
                Alterar senha
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={style.gridAlt}
                    component="form"
                    id="senha"
                    name="senha"
                    onSubmit={async (e) => sendData(e)}
                >
                    <TextField
                        label="E-mail"
                        name="email"
                        id="email"
                        value={localStorage.getItem('usermail')}
                        disabled
                    />
                    <TextField
                        label="Senha atual"
                        name="password"
                        id="password"
                        type="password"
                        required
                    />
                    <TextField
                        label="Nova senha"
                        name="newpassword"
                        type="password"
                        id="newpassword"
                        required
                    />
                    <TextField
                        name="password_confirmation"
                        label="Confirmação de nova senha"
                        type="password"
                        id="password_confirmation"
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end' , padding: "1.5rem", pt: '0' }}>
                <Box sx={{ display: 'flex', margin: '0.5rem', gap: '1rem' }}>
                    <Button onClick={() => setOpenAltSenha(false)}>
                        Cancelar
                    </Button>
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
    )
}

export default SenhaForm