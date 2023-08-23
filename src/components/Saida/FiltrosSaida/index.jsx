import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Filtros from '../../Filtros';
import CampoDataRange from '../../CampoDataRange';

const FiltrosSaida = () => {
    const [datas, setDatas] = useState([''])
    return (
        <Filtros
            //valor da data de baixa e funcao para limpar tal data
            saida={datas}
            limpaData={setDatas}
        >
            <CampoDataRange
                label={'Data da Baixa - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                className={"col-span-2"}
                separador={' - '}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />

            <TextField 
                label="Base origem do pedido"
                name="origem"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Local de serviço"
                name="local_servico"
                InputLabelProps={{ shrink: true }}
            />
        </Filtros>
    );
}

export default FiltrosSaida;