import React from 'react';
import { 
    TextField, 
    Box,
    Button,
    Paper,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import style from './style';
import Titulo from '../Titulo';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BoxLogin = (props) => {
    const {
        visibilidade,
        setVisibilidade,
        carregando,
        login,
        errors,
    } = props;

    return (
        <Paper className="md:w-3/5 xl:w-2/5 mx-auto my-8 p-4" elevation={6}>
            <Titulo>
                Entrar
            </Titulo>
            
            <Box 
                component="form" 
                id="login" 
                className="flex flex-col px-4 py-6 gap-8"
                onSubmit={login}
            >
                <Box className="flex items-center justify-between gap-4">
                    <EmailIcon color="primary" />
                    <TextField 
                        label="E-mail"
                        name="email"
                        type="email"
                        error={errors.hasOwnProperty('message')}
                        fullWidth
                    />
                </Box>

                <Box className="flex items-center gap-4">
                    <LockIcon color="primary" />
                    <TextField 
                        label="Senha"
                        name="password"
                        type={visibilidade ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setVisibilidade(!visibilidade)}>
                                        {
                                            visibilidade
                                            ? <VisibilityOffIcon />
                                            : <VisibilityIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={errors.hasOwnProperty('message')}
                        helperText={errors.message || ""}
                        fullWidth
                    />
                </Box>

                <Box className="flex justify-end">
                    <Button type="submit" form="login" variant="contained" disabled={carregando}>
                        {
                            carregando
                            ? <CircularProgress sx={style.circularProgress} size={14} />
                            : ""
                        }
                        Entrar
                    </Button>
                </Box>
            </Box>

            <Box className="border border-material-border rounded p-4 mx-4 mb-4 flex flex-col gap-6">
                <Typography>
                    <strong>Importante</strong>: Se este for o seu primeiro acesso, recomendamos que troque a senha. 
                    Para isso, após efetuar o login basta clicar no ícone de troca de senha localizado ao lado do nome de usuário.
                </Typography>

                <Typography>
                    Caso tenha esquecido sua senha ou precise criar um usuário para acesso, favor enviar 
                    e-mail para <strong>tisvma@prefeitura.sp.gov.br</strong>.
                    No e-mail, informe o serviço a ser solicitado (esqueci a senha/criar usuário), 
                    o e-mail caso esteja solicitando o serviço para terceiro, e o sistema (<strong>Almoxarifado</strong>). 
                </Typography>
            </Box>
        </Paper>
    );
}

export default BoxLogin;