import React from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Collapse,
} from '@mui/material';
import style from './style';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import TituloTexto from '../TituloTexto';
import { formataDateTime, headers } from '../../common/utils';

const BaixaSaidaMaterial = ({ ordemServico, carregando, id, materiais }) => {
  const enviaBaixa = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputObject = Object.fromEntries(formData);
    let arr = [];
    
    Object.entries(inputObject).forEach(item => {
      let index = item[0].replace(/.+\[(\d)\]\.(\w+)/gm, '$1');
      let key = item[0].replace(/.+\[(\d)\]\.(\w+)/gm, '$2');
      
      arr[index] = { ...arr[index], [`${key}`]: item[1]};
    });
    
    const items = { ordem_servico_items: [...arr] };
    const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${id}/baixa`;
    const options = {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <ContainerPrincipal>
      <Titulo voltaPara="/ordemservico" carregando={carregando}>
        Baixa da saída de material
      </Titulo>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          Ordem de serviço <strong>#{`${id}`}</strong>
        </Typography>

        <Collapse in={!carregando}>
          <Box className="p-6 grid grid-cols-3 gap-8">
            <TituloTexto 
              titulo="Origem"
              texto={ordemServico.origem}
            />

            <TituloTexto 
              titulo="Local de serviço"
              texto={ordemServico.local_servico}
            />

            <TituloTexto 
              titulo="Profissional"
              texto={ordemServico.profissional || "---"}
            />

            <TituloTexto
              titulo="Especificações"
              texto={ordemServico.especificacao || "---"}
              className="col-span-3"
              component="code"
              childComponent="pre"
              childStyle={{ whiteSpace: 'pre-wrap' }}
            />
          
            <TituloTexto 
              titulo="Horas de execução"
              texto={`
                ${ordemServico.horas_execucao || "---"} 
                ${ordemServico.horas_execucao 
                  ? ordemServico.horas_execucao > 1 ? "horas" : "hora" 
                  : ""
                }`
              }
            />
            
            <TituloTexto 
              titulo="Data de início do serviço"
              texto={ formataDateTime(ordemServico.data_inicio_servico) || "Data de início indeterminada" }
            />

            <TituloTexto 
              titulo="Data de fim do serviço"
              texto={ formataDateTime(ordemServico.data_fim_servico) || "Data de fim indeterminada" }
            />
          </Box>
        </Collapse>
      </Box>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          Material utilizado
        </Typography>

        <Collapse 
          in={!carregando} 
          component="form" 
          id="baixa-items"
          onSubmit={enviaBaixa}
        >
          {
            materiais.length > 0
            ?
              materiais.map((material, index) => (
                <Paper sx={style.paperBg} key={material.id}>
                  <Paper className='p-4 grid grid-cols-2 items-center'>
                    <Typography>{material.item}</Typography>

                    <Box className='flex gap-4'>
                      <TextField
                        label="Solicitado"
                        value={material.quantidade}
                        size="small"
                        disabled
                      />

                      {/* adiciona o id ao FormData */}
                      <input 
                        type="text" 
                        name={`ordem_servico_items[${index}].id`} 
                        defaultValue={material.id} 
                        style={{ display: 'none' }} 
                      />

                      <TextField
                        label="Enviado"
                        defaultValue={material.enviado}
                        name={`ordem_servico_items[${index}].enviado`}
                        size="small"
                      />

                      <TextField
                        label="Usado"
                        defaultValue={material.usado}
                        name={`ordem_servico_items[${index}].usado`}
                        size="small"
                      />

                      <TextField
                        label="Retorno"
                        defaultValue={material.retorno}
                        name={`ordem_servico_items[${index}].retorno`}
                        size="small"
                      />
                    </Box>
                  </Paper>
                </Paper>
              ))
            :
              <Typography sx={style.span}>Não há materiais a serem exibidos</Typography>
          }
        </Collapse>
      </Box>

      <Box className="flex justify-end gap-4 pt-4">
        <Button>
          Cancelar
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="baixa-items"
        >
          Enviar
        </Button>
      </Box>
    </ContainerPrincipal>
  );
}

export default BaixaSaidaMaterial;

// {
//   "ordem_servico_items": [
//     {
//       "id":"10",
//       "enviado":"6",
//       "usado":"4",
//       "retorno":"2"
//     },
//     {
//       "id":"11",
//       "enviado":"6",
//       "usado":"6",
//       "retorno":"0"
//     },
//     {
//       "id":"12",
//       "enviado":"1",
//       "usado":"1",
//       "retorno":"0"
//     }
//   ]
// }