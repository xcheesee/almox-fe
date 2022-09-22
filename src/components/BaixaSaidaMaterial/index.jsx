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
import { formataDateTime } from '../../common/utils';

const BaixaSaidaMaterial = ({ ordemServico, carregando, id, materiais }) => {
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

        <Collapse in={!carregando}>
          {
            materiais.length > 0
            ?
              materiais.map(material => (
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

                      <TextField
                        label="Enviado"
                        defaultValue={material.enviado}
                        size="small"
                      />

                      <TextField
                        label="Usado"
                        defaultValue={material.usado}
                        size="small"
                      />

                      <TextField
                        label="Retorno"
                        defaultValue={material.retorno}
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
        >
          Enviar
        </Button>
      </Box>
    </ContainerPrincipal>
  );
}

export default BaixaSaidaMaterial;