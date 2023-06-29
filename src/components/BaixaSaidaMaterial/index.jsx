import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Collapse,
  CircularProgress
} from '@mui/material';
import style from './style';
import ContainerPrincipal from '../ContainerPrincipal';
import Titulo from '../Titulo';
import TituloTexto from '../TituloTexto';
import { formataDateTime } from '../../common/utils';
import { Link } from 'react-router-dom';

const BaixaSaidaMaterial = ({ ordemServico, carregando, id, materiais, checaErros, errors, setErrors, carregandoBaixa }) => {
  const [enviado, setEnviado] = useState([]);
  const [usado, setUsado] = useState([]);
  const [retorno, setRetorno] = useState([]);
  const [error, setError] = useState(false);

  const handleBlur = (e, index, valor, quantidade) => {
    let arr = valor;
    arr[index] = e.target.value;

    if (valor === enviado)
      setEnviado([...arr]);
    else
      setUsado([...arr]);

    let arrRetorno = retorno;
    arrRetorno[index] = enviado[index] - usado[index];

    setRetorno([...arrRetorno]);
  }

  return (
    <ContainerPrincipal>
      <Titulo voltaPara="/saida" carregando={carregando}>
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
          in={materiais.length > 0} 
          component="form" 
          id="baixa-items"
          onSubmit={checaErros}
        >
          <Paper sx={style.paperBg}>
          {
            materiais.length > 0
            ?
              materiais.map((material, index) => (
                  <Paper className='p-4 grid grid-cols-2 items-center' key={material.id}>
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
                        defaultValue={material.item_id} 
                        style={{ display: 'none' }} 
                      />

                      <TextField
                        label="Enviado"
                        defaultValue={material.enviado}
                        onBlur={(e) => { 
                          handleBlur(e, index, enviado);
                          setError((parseInt(enviado[index]) < parseInt(usado[index])) || (parseInt(enviado[index]) > parseInt(material.quantidade))); 
                        }}
                        name={`ordem_servico_items[${index}].enviado`}
                        error={parseInt(enviado[index]) > parseInt(material.quantidade)}
                        helperText={parseInt(enviado[index]) > parseInt(material.quantidade) ? "O valor de enviado não pode ser maior que o valor solicitado" : ""}
                        size="small"
                      />

                      <TextField
                        label="Usado"
                        defaultValue={material.usado}
                        onBlur={(e) => { 
                          handleBlur(e, index, usado); 
                          setError((parseInt(enviado[index]) < parseInt(usado[index])) || (parseInt(enviado[index]) > parseInt(material.quantidade))); 
                        }}
                        name={`ordem_servico_items[${index}].usado`}
                        error={parseInt(enviado[index]) < parseInt(usado[index])}
                        helperText={parseInt(enviado[index]) < parseInt(usado[index]) ? "O valor de usado não pode ser maior que o valor enviado" : ""}
                        size="small"
                      />

                      <TextField
                        label="Retorno"
                        value={retorno[index] || 0}
                        name={`ordem_servico_items[${index}].retorno`}
                        size="small"
                        onBlur={() => setErrors({})}
                        error={errors.hasOwnProperty(`retorno[${index}]`)}
                        helperText={errors[`retorno[${index}]`] || ''}
                      />
                    </Box>
                  </Paper>
              ))
            :
              <Typography sx={style.span}>Não há materiais a serem exibidos</Typography>
          }
          </Paper>
        </Collapse>
      </Box>

      <Box className="flex justify-end gap-4 pt-4">
        <Link to="/ordemservico">
          <Button>
            Cancelar
          </Button>
        </Link>
        <Button
          variant="contained"
          type="submit"
          form="baixa-items"
          disabled={error}
        >
          {carregandoBaixa
            ? <CircularProgress color="color" size="1rem" className='mr-2' />
            : ""
          }
          Enviar
        </Button>
      </Box>
    </ContainerPrincipal>
  );
}

export default BaixaSaidaMaterial;