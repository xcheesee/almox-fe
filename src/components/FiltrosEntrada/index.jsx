import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import Filtros from '../Filtros';
import Selecao from '../Selecao';
import CampoDataRange from '../CampoDataRange';
import { primeiraLetraMaiuscula, getMatTipos } from '../../common/utils';

const FiltrosEntrada = () => {
    
    const [datas, setDatas] = useState(['']);
    const [tiposMats, setTiposMats] = useState({});
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await getMatTipos();
            setTiposMats(data);
            setCarregando(false);
        })();
    }, [])

    return (
        <Filtros
            //valor da data de entrada e funcao para limpar tal data
            entrada={datas}
            limpaData={setDatas}
        >
            <CampoDataRange
                label={'Data de entrada - faixa de pesquisa'}
                intervalo={datas}
                onChange={setDatas}
                separador={' - '}
                className={"col-span-2"}
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
            
            <Selecao
                label="Tipo"
                name="tipo"
                carregando={carregando}
                className="col-span-2"
            >
                {                                    
                    tiposMats.data
                        ?.map((val, i) => 
                            <MenuItem value={val.nome} key={i} >
                                {primeiraLetraMaiuscula(val.nome)}
                            </MenuItem>)
                }
            </Selecao>
        </Filtros>
    );
}

export default FiltrosEntrada;