import React from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button
} from '@mui/material';
import style from './style';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import { useParams } from 'react-router-dom';

const BaixaSaidaMaterial = () => {
  let params = useParams();

  const ordemservico = {
    origem: 'Leopoldina',
    local_servico: 'Ibirapuera',
    especificacoes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Donec ut molestie nunc, ut ornare odio. Etiam a ligula a ipsum pulvinar sollicitudin. 
    Sed viverra dui tellus, vel pellentesque turpis vulputate quis. Pellentesque nec varius diam. 
    Sed laoreet ullamcorper placerat. Etiam rhoncus aliquam consequat. Etiam ac semper ante, ut dignissim ligula. 
    Quisque est turpis, euismod eu facilisis in, scelerisque sed diam. Sed non tempor nisi.`,
    profissional: 'Fulano Ciclano',
    horas_execucao: '8',
    data_servico: '2022-08-05',
    material_utilizado: [
      { material: 'Adaptador de PVC rígido soldável, com flange, 25mm x 3/4"', solicitado: 50, enviado: 50, usado: 50, retorno: 0 },
      { material: 'Tábua "2,5 x 30" cm em pinus; mista ou equivalente da região - Bruta', solicitado: 2000, enviado: 1800, usado: 1200, retorno: 600 }
    ]
  }

  return (
    <ContainerPrincipal>
      <Titulo voltaPara="/ordemservico">
        Baixa da saída de material
      </Titulo>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          Ordem de serviço <strong>#{`${params.id}`}</strong>
        </Typography>

        <Paper className="p-6 grid grid-rows-3 items-center">
          <Box className='grid grid-cols-3 self-start'>
            <Typography sx={style.textoNegrito}>
              Origem
              <Typography sx={style.span} component="span">{ordemservico.origem}</Typography>
            </Typography>

            <Typography sx={style.textoNegrito}>
              Local de serviço
              <Typography sx={style.span} component="span">{ordemservico.local_servico}</Typography>
            </Typography>
          </Box>

          <Box>
            <Typography sx={style.textoNegrito}>
              Especificaçõs
              <Typography sx={style.span} component="span">{ordemservico.especificacoes}</Typography>
            </Typography>
          </Box>

          <Box className='grid grid-cols-3 self-end'>
            <Typography sx={style.textoNegrito}>
              Profissional
              <Typography sx={style.span} component="span">{ordemservico.profissional}</Typography>
            </Typography>

            <Typography sx={style.textoNegrito}>
              Horas execução
              <Typography sx={style.span} component="span">{ordemservico.horas_execucao} {ordemservico.horas_execucao <= 1 ? 'hora' : 'horas'}</Typography>
            </Typography>

            <Typography sx={style.textoNegrito}>
              Data do serviço
              <Typography sx={style.span} component="span">{ordemservico.data_servico}</Typography>
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          Material utilizado
        </Typography>

        <Paper sx={style.paperBg}>
          {ordemservico.material_utilizado.map((material, index) => (
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
          ))}
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