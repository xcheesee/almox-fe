import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import Filtros from '../../Filtros';
import CampoDataRange from '../../CampoDataRange';
import { getMatTipos } from '../../../common/utils';
import { useQuery } from '@tanstack/react-query'

const FiltrosEntrada = () => {
    const tipos = useQuery({
        queryKey: ['tiposMateriais'], 
        queryFn: () => getMatTipos({}),
    });

    const [datas, setDatas] = useState(['']);
    const [tipo, setTipo] = useState("")
    
    function limpaForms() {
        setTipo("")
    }

    return (
        <Filtros
            //valor da data de entrada e funcao para limpar tal data
            entrada={datas}
            limpaData={setDatas}
            limpaForms={limpaForms}
        >
            <CampoDataRange
                label={'Data de entrada - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                separador={' - '}
                className={"lg:col-span-2"}
                placeholder={'dd/mm/aaaa - dd/mm/aaaa'}
                size={'lg'}
            />

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
                name="local"
                InputLabelProps={{ shrink: true }}
            />

            <TextField 
                label="Número nota fiscal"
                name="numero_nota_fiscal"
                InputLabelProps={{ shrink: true }}
            />
            
            <TextField
                select
                label={tipos.isLoading? "Carregando..." : "Tipo"}
                name="tipo"
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                disabled={tipos.isLoading}
                className="lg:col-span-2"
            >
                {tipos.isLoading
                    ?<MenuItem>Carregando...</MenuItem>
                    :tipos?.data?.data
                        ?.map((val, i) => 
                            <MenuItem value={val.nome} key={i} className='capitalize'>
                                {val.nome}
                            </MenuItem>)
                }
            </TextField>
        </Filtros>
    );
}

export default FiltrosEntrada;