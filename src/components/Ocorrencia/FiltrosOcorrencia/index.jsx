import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import Filtros from '../../Filtros';
import CampoDataRange from '../../CampoDataRange';

const FiltrosOcorrencia = () => {

    const [datas, setDatas] = useState(['']);
    const [tipoOcorrencia, setTipoOcorrencia] = useState("")

    function limpaForms() { setTipoOcorrencia("") }

    return (
        <Filtros
            //valor da data de entrada e funcao para limpar tal data
            ocorrencia={datas}
            limpaData={setDatas}
            limpaForms={limpaForms}
        >
            <CampoDataRange
                label={'Data de Ocorrência- faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                separador={' - '}
                className={"col-span-2"}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />

            <TextField 
                label="Local de Ocorrência"
                name="local"
                id="local"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                select
                label="Tipo de Ocorrência"
                name="tipo_ocorrencia"
                id="tipo_ocorrencia"
                value={tipoOcorrencia}
                onChange={e => setTipoOcorrencia(e.target.value)}
                fullWidth
            >
                <MenuItem value="avaria">Avaria</MenuItem>
                <MenuItem value="furto">Furto</MenuItem>
                <MenuItem value="extravio">Extravio</MenuItem>
            </TextField>
            
        </Filtros>
    );
}

export default FiltrosOcorrencia;