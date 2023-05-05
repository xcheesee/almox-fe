import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Filtros from '../Filtros';
import CampoDataRange from '../CampoDataRange';
//import { getMatTipos } from '../../common/utils';
//import { useQuery, useQueryClient } from '@tanstack/react-query'

const FiltrosTransferencia = () => {
    //const queryClient = useQueryClient();

    //const tipos = useQuery(['tiposMateriais'], getMatTipos, {
    //    staleTime: 120000,
    //    cacheTime: 120000,
    //});
    
    const [datas, setDatas] = useState(['']);

    return (
        <Filtros
            //valor da data de entrada e funcao para limpar tal data
            //entrada={datas}
            limpaData={setDatas}
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
                name="base_origem_id"
                id="base_origem_id"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Base de Destino"
                name="base_destino_id"
                id="base_destino_id"
                InputLabelProps={{ shrink: true }}
            />
            
        </Filtros>
    );
}

export default FiltrosTransferencia;