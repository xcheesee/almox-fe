import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import Filtros from '../../Filtros';
import CampoDataRange from '../../CampoDataRange';
import { statusTransferencia } from '../../../common/utils/constants';

const FiltrosTransferencia = () => {
    
    const [datas, setDatas] = useState(['']);
    const [tipo, setTipo] = useState("")

    function limpaForms() {
        setTipo("")
    }

    return (
        <Filtros
            transferencia={datas}
            limpaData={setDatas}
            limpaForms={limpaForms}
        >
            <CampoDataRange
                label={'Data de Transferencia - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                separador={' - '}
                className={"col-span-2"}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />

            <TextField 
                label="Base de Origem"
                name="origem"
                id="origem"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Base de Destino"
                name="destino"
                id="destino"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                select
                label="Status"
                name="status"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                //inputProps={{ value: tipo, onChange: (e) => setTipo(e.target.value)}}
                id="status"
                className='col-span-2'
            >
                {
                    Object.entries(statusTransferencia).map( (keyVal, index) => (<MenuItem key={`status${index}`}value={keyVal[0]}>{keyVal[1]}</MenuItem>) )
                }
            </TextField>
        </Filtros>
    );
}

export default FiltrosTransferencia;