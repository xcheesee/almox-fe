import React from 'react';
import {
  Typography,
  Box,
  Paper,
  // TextField,
  Button,
  Collapse,
} from '@mui/material';
import style from './style';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import { formataDateTime } from '../../common/utils';

const BaixaSaidaMaterial = ({ ordemServico, carregando, id }) => {
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
          <Box className="p-6 grid grid-rows-3 gap-8 items-center">
            <Box className='grid grid-cols-3 self-start'>
              <Typography sx={style.textoNegrito}>
                Origem
                <Typography sx={style.span} component="span">{ordemServico.origem}</Typography>
              </Typography>

              <Typography sx={style.textoNegrito}>
                Local de serviço
                <Typography sx={style.span} component="span">{ordemServico.local_servico}</Typography>
              </Typography>

              <Typography sx={style.textoNegrito}>
                Profissional
                <Typography sx={style.span} component="span">{ordemServico.profissional}</Typography>
              </Typography>
            </Box>

            <Box className='grid grid-cols-3 self-start'>
              <Typography sx={style.textoNegrito}>
                Especificações
                <Typography sx={style.span} component="span">{ordemServico.especificacao}</Typography>
              </Typography>
            </Box>

            <Box className='grid grid-cols-3 self-end'>
              <Typography sx={style.textoNegrito}>
                Horas execução
                <Typography sx={style.span} component="span">
                  {ordemServico.horas_execucao} {ordemServico.horas_execucao <= 1 ? 'hora' : 'horas'}
                </Typography>
              </Typography>
              
              <Typography sx={style.textoNegrito}>
                Data de início do serviço
                <Typography sx={style.span} component="span">
                  { formataDateTime(ordemServico.data_inicio_servico) || "Sem data de início" }
                </Typography>
              </Typography>
              
              <Typography sx={style.textoNegrito}>
                Data de fim do serviço
                <Typography sx={style.span} component="span">
                  { formataDateTime(ordemServico.data_fim_servico) || "Sem data de fim" }
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          Material utilizado
        </Typography>

        <Paper sx={style.paperBg}>
          {/* {ordemServico.material_utilizado.map((material, index) => (
            <Paper className='p-4 grid grid-cols-2 items-center' key={index}>
              <Typography>{material.material}</Typography>

              <Box className='flex gap-4'>
                <TextField
                  label="Solicitado"
                  defaultValue={material.solicitado}
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
          ))} */}
        </Paper>
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