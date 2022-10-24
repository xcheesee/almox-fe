import React, { useState } from 'react';
import { 
    IconButton, 
    Box, 
    Badge, 
    Typography, 
    Collapse, 
    Button, 
    Tooltip,
} from '@mui/material';
import style from './style';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import RefreshIcon from '@mui/icons-material/Refresh';
import { filtrosAtom, mudancaAtom, pageAtom } from '../../atomStore';
import { useAtom, useSetAtom } from 'jotai';

const Filtros = (props) => {
    //O DatePicker do RSuite nao passa values para form a nao ser que seja a implementacao de form do proprio RSuite
    //https://rsuitejs.com/components/form/#code-lt-form-control-gt-code
    //A implementacao atual usa States para value storage
    const {
        entrada,
        ordem,
        limpaData,
        ...other
    } = props;

    const [visibilidade, setVisibilidade] = useState(false);
    const [filtrosAtivos, setFiltrosAtivos] = useState(['']);
    
    const setPage = useSetAtom(pageAtom)
    const [filtros, setFiltros] = useAtom(filtrosAtom)
    // const setHouveMudanca = useSetAtom(mudancaAtom)

    //limpaData apaga o dataRange no callback limpar
    const limpar = () => {
        setFiltrosAtivos(['']);
        setFiltros('')
        setPage(1)
        setVisibilidade(false);
        //checa se filtragem possui seletor de data
        if (typeof limpaData === 'function') {
            limpaData([''])
        }
    }

    const salvar = (e) => {
        e.preventDefault();
        const arrFiltros = [];
        const formData = new FormData(e.target);
        const [entradaDepoisDe, entradaAntesDe] = validaData(entrada)
        const [ordemDepoisDe, ordemAntesDe] = validaData(ordem)
        const inputObject = {
            ...Object.fromEntries(formData),
            entrada_depois_de: entradaDepoisDe,
            entrada_antes_de: entradaAntesDe,
            servico_depois_de: ordemDepoisDe,
            servico_antes_de: ordemAntesDe
        }
        
        setFiltros(
            Object.entries(inputObject)
                .filter(filtro => filtro[1] !== '')
                .reduce((acc, filtro) => {
                    let currFiltro = `&filter[${filtro[0]}]=${filtro[1]}`
                    arrFiltros.push(currFiltro)
                    return acc + currFiltro
                }, '')
        )
        setFiltrosAtivos(['', ...arrFiltros]);
        setPage(1)
        setVisibilidade(false);
    }

    const repetirPesquisa = () => {
        setVisibilidade(false);
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
                        {
                            filtros !== ''
                            ?
                                <Tooltip title="Repetir consulta">
                                    <Button sx={{ minWidth: '2.5rem' }} onClick={repetirPesquisa}>
                                        <RefreshIcon />
                                    </Button>
                                </Tooltip>
                            :
                                ""
                        }
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
}

export default Filtros;