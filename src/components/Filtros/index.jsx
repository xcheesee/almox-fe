import React, { useState } from 'react';
import { IconButton, Box, Badge, Typography, Collapse, Button } from '@mui/material';
import style from './style';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';

//TODO: resetar estilo de Pagination quando o filtro faz update nos dados de entrada 

const Filtros = (props) => {
    //O DatePicker do RSuite nao passa values para form a nao ser que seja a implementacao de form do proprio RSuite
    //https://rsuitejs.com/components/form/#code-lt-form-control-gt-code
    //A implementacao atual usa States para value storage
    const {
        entrada,
        ordem,
        limpaData,
        setFiltros,
        setPage,
        ...other
    } = props;

    const [visibilidade, setVisibilidade] = useState(false);
    const [filtrosAtivos, setFiltrosAtivos] = useState(['']);

    //limpaData apaga o dataRange no callback limpar
    const limpar = () => {
        setPage(1)
        setVisibilidade(false);
        setFiltrosAtivos(['']);
        setFiltros('')
        limpaData(['']);
        
    }

    const salvar = (e) => {
        e.preventDefault();
        const arrFiltros = [];
        

        const formData = new FormData(e.target);
        const [entradaDepoisDe, entradaAntesDe] = validaData(entrada)
        const inputObject = {
            ...Object.fromEntries(formData),
            entrada_depois_de: entradaDepoisDe,
            entrada_antes_de: entradaAntesDe,
            // data_servico: validaData(ordem)
        }
        
        setFiltros(
            Object.entries(inputObject)
                .filter((filtro) => filtro[1] !== '')
                .reduce((acc, filtro) => {
                    let currFiltro = `&filter[${filtro[0]}]=${filtro[1]}`
                    arrFiltros.push(currFiltro)
                    return acc + currFiltro
                    
                }, '')
        )
        setFiltrosAtivos(['', ...arrFiltros]);
        setVisibilidade(false);
        setPage(1)
    }

    //checa por input em branco ou nao inicializado
    const validaData = (dataRange) => {
        return (
            dataRange === undefined || dataRange[0] === ''
                ? ['', '']
                : dataRange
        )
    }

    return (
        <Box>
            <Box className="flex justify-end">
                <IconButton 
                    onClick={() => setVisibilidade(!visibilidade)} 
                    sx={style.iconButton}
                >
                    <Badge 
                        badgeContent={filtrosAtivos.length - 1} 
                        color="primary"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={style.badge}
                    >
                        <Typography 
                            variant="h3" 
                            component="h3" 
                            sx={style.labelBotao}
                        >
                            <TuneIcon fontSize="small" sx={style.tuneIcon} />
                            Filtros
                        </Typography>
                        {
                            visibilidade
                            ? <ExpandLessIcon fontSize="small" sx={style.expandIcon} />
                            : <ExpandMoreIcon fontSize="small" sx={style.expandIcon} />
                        }
                    </Badge>
                </IconButton>
            </Box>

            <Collapse in={visibilidade}>
                <Box 
                    sx={style.containerFiltros}
                >
                    <Box 
                        sx={style.gridFiltro}
                        component="form"
                        id="filtros"
                        onSubmit={salvar}
                    >
                        {other.children}
                    </Box>
                    
                    <Box sx={style.containerBotoes}>
                        <Button 
                            onClick={limpar}
                            type="reset"
                            form="filtros"
                        >
                            Limpar
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            form="filtros"
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
}

export default Filtros;