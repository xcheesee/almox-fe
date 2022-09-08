import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import Filtros from '../Filtros';
import Selecao from '../Selecao';
import CampoDataRange from '../CampoDataRange';

const FiltrosEntrada = ({setFiltros}) => {
    const [datas, setDatas] = useState([''])
    return (
        <Filtros
            //valor da data de entrada e funcao para limpar tal data
            entrada={datas}
            limpaData={setDatas}
            setFiltros={setFiltros}
        >
            <TextField 
                label="Processo SEI"
                name="processo_sei"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Número contrato"
                name="numero_contrato"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Base"
                name="base"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Número nota fiscal"
                name="nota_fiscal"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Data de entrada"
                name="data_entrada"
                type="date"
                InputLabelProps={{ shrink: true }}
            />

            <CampoDataRange
                label={'Data de entrada - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                separador={' - '}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />

            <Selecao
                label="Tipo"
                name="tipo"
            >
                <MenuItem value={1}>Teste 1</MenuItem>
                <MenuItem value={2}>Teste 2</MenuItem>
                <MenuItem value={3}>Teste 3</MenuItem>
                <MenuItem value={4}>Teste 4</MenuItem>
                <MenuItem value={5}>Teste 5</MenuItem>
            </Selecao>
        </Filtros>
    );
}

export default FiltrosEntrada;