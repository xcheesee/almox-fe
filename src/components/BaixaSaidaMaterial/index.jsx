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
import OrdemProfsCard from '../OrdemProfsCard';

const BaixaSaidaMaterial = ({ 
  baixa,
  carregando, 
  id, 
  checaErros, 
  errors, 
  setErrors, 
  carregandoBaixa 
}) => {
  const [enviado, setEnviado] = useState([]);
  const [usado, setUsado] = useState([]);
  const [retorno, setRetorno] = useState([]);
  const [error, setError] = useState(false);
  const [invalidFocus, setInvalidFocus] = useState(false)

  const handleBlur = (e, index, valor, quantidade) => {
    let arr = valor;
    arr[index] = e.target.value;

    if (valor === enviado)
      return
      //setEnviado([...arr]);
    else
      setUsado([...arr]);

    let arrRetorno = retorno;
    arrRetorno[index] = quantidade - usado[index];

    setRetorno([...arrRetorno]);
  }

  if (!baixa){
    return <></>
  }

  return (
    <ContainerPrincipal>
      <Titulo voltaPara="/saida" carregando={carregando}>
        Baixa da saída de material
      </Titulo>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          {baixa.ordem_servico_id
            ?  <span>Ordem de serviço <strong>#{`${baixa.ordem_servico_id}`}</strong></span>
            : <span>Saida de Materiais <strong>#{`${id}`}</strong></span>
          }
        </Typography>

        <Collapse in={!carregando}>
          <Box className="p-6 grid grid-cols-3 gap-8">
            <TituloTexto 
              titulo="Departamento"
              texto={baixa.departamento}
            />
            <TituloTexto 
              titulo="Origem"
              texto={baixa.origem}
            />

            <TituloTexto 
              titulo="Local de serviço"
              texto={baixa.local_servico}
            />

            {/*<TituloTexto 
              titulo="Profissional"
              texto={baixaItems.profissional || "---"}
            />*/}

            {/*<TituloTexto
              titulo="Especificações"
              texto={baixaItems.especificacao || "---"}
              className="col-span-3"
              component="code"
              childComponent="pre"
              childStyle={{ whiteSpace: 'pre-wrap' }}
            />*/}
          
            {/*<TituloTexto 
              titulo="Horas de execução"
              texto={`
                ${baixaItems.horas_execucao || "---"} 
                ${baixaItems.horas_execucao 
                  ? baixaItems.horas_execucao > 1 ? "horas" : "hora" 
                  : ""
                }`
              }
            />*/}
            
            <TituloTexto 
              titulo="Data de início do serviço"
              texto={ formataDateTime(baixa.data_inicio_servico) || "Data de início indeterminada" }
            />

            <TituloTexto 
              titulo="Data de fim do serviço"
              texto={ formataDateTime(baixa.data_fim_servico) || "Data de fim indeterminada" }
            />
          </Box>

          <OrdemProfsCard profissionais={baixa.profissionais} />
        </Collapse>
      </Box>

      <Box sx={style.box}>
        <Typography sx={style.subTitulo} >
          Material utilizado
        </Typography>

        <Collapse 
          in={baixa?.itens ? baixa.itens.length > 0 : false} 
          component="form" 
          id="baixa-items"
          onSubmit={checaErros}
        >
          <Paper sx={style.paperBg}>
          {
            baixa?.itens.length > 0
            ?
              baixa?.itens.map((material, index) => (
                  <Paper className='p-4 grid grid-cols-2 items-center' key={material.id}>
                    <Typography>{material.item}</Typography>

                    <Box className='flex gap-4'>
                      <TextField
                        label="Solicitado"
                        style={{ display: 'none' }} 
                        value={material.quantidade}
                        name={`saida_items[${index}].quantidade`}
                        size="small"
                      />

                      {/* adiciona o id ao FormData */}
                      <input 
                        type="text" 
                        name={`saida_items[${index}].id`} 
                        defaultValue={material.item_id} 
                        style={{ display: 'none' }} 
                      />

                      <TextField
                        label="Enviado"
                        onFocus={() => setInvalidFocus(true)}
                        value={material.quantidade}
                        onBlur={(e) => { 
                          setInvalidFocus(false)
                          handleBlur(e, index, enviado, material.quantidade);
                          setError((parseInt(enviado[index]) < parseInt(usado[index])) || (parseInt(enviado[index]) > parseInt(material.quantidade))); 
                        }}
                        name={`saida_items[${index}].enviado`}
                        error={invalidFocus}
                        helperText={invalidFocus ? "Campo não alteravel!"  : ""}
                        size="small"

                      />

                      <TextField
                        label="Usado"
                        defaultValue={material.usado}
                        onBlur={(e) => { 
                          handleBlur(e, index, usado, material.quantidade); 
                          setError((parseInt(enviado[index]) < parseInt(usado[index])) || (parseInt(enviado[index]) > parseInt(material.quantidade))); 
                        }}
                        name={`saida_items[${index}].usado`}
                        error={parseInt(enviado[index]) < parseInt(usado[index])}
                        helperText={parseInt(enviado[index]) < parseInt(usado[index]) ? "O valor de usado não pode ser maior que o valor enviado" : ""}
                        size="small"
                      />

                      <TextField
                        label="Retorno"
                        value={retorno[index] || 0}
                        name={`saida_items[${index}].retorno`}
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
        <Link to="/saida">
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