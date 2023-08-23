import React, { useState } from 'react';
import BaixaSaidaMaterial from '../../components/BaixaSaidaMaterial';
import DialogConfirmaBaixa from '../../components/DialogConfirmaBaixa';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { enviaBaixa, errorBuilder, getDados } from '../../common/utils';
import { Box, CircularProgress } from '@mui/material';

const Baixa = ({ setSnackbar }) => {
  let params = useParams();
  const navigate = useNavigate();
  const [openBaixa, setOpenBaixa] = useState(false);
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);

  const baixa = useQuery(['baixaItem', params.id], async () => {
    let dados;
    const [saidaRes, itensRes, profsRes] = await Promise.all([
      getDados(`saida/${params.id}`), 
      getDados(`saida/${params.id}/items`), 
      getDados(`saida/${params.id}/profissionais`)
    ])
    dados = saidaRes.data;
    if (dados.flg_baixa) {
      throw errorBuilder(saidaRes, "Baixa Ja realizada")
    }
    dados.itens = itensRes.data
    dados.profissionais = profsRes.data
    return dados
  }, {
    retry: 1,
    onSuccess: async (res) => {
      //const profsRes = await getDados(`saida/${params.id}/profissionais`)
      //setProfissionais(res.profissionais)
      //setBaixaItems(res || {})
      //setMateriais(res.itens)
    }, onError: async (res) => {
      if (res.status === 404) {
        navigate('/404', { replace: true })
      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: res.message
        })
        navigate('/saida', { replace: true })
      };
      
    }
  })

  const enviarBaixa = useMutation(async () => {
    setOpenBaixa(false)
    return await enviaBaixa(items, params.id)
  }, {
    onSuccess: async () => {
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Baixa da ordem de serviço efetuada com sucesso!',
      });
      navigate('/saida', { replace: true });
    }, onError: async (res) => {
      setSnackbar({
        open: true,
        severity: 'error',
        message: `Não foi possível efetuar a baixa da ordem de serviço (Erro ${res.status})`
      });
    } 
  })

  const checaErros = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const inputObject = Object.fromEntries(formData);
    let arr = [];
    let objErros = {};

    Object.entries(inputObject).forEach(item => {
      let index = item[0].replace(/.+\[(\d)\]\.(\w+)/gm, '$1');
      let key = item[0].replace(/.+\[(\d)\]\.(\w+)/gm, '$2');

      arr[index] = { ...arr[index], [`${key}`]: item[1]};
    });

    arr.forEach((item, index) => {
      if (parseInt(item.retorno) > parseInt(item.enviado)) {
        objErros = { ...objErros, [`retorno[${index}]`]: 'O valor de retorno não pode ser maior do que o valor de enviado' };
      }
    });

    setItems({ saida_items: [...arr] });
    setErrors(objErros);

    if (Object.keys(objErros).length === 0 && Object.keys(errors).length === 0 ) {
      setOpenBaixa(true);
    }
  }

  if(baixa.isLoading) {
    return (
      <Box className='flex justify-center'>
        <CircularProgress size={48} />
      </Box>
    )
  }

  return (
    <>
      <BaixaSaidaMaterial 
      baixa={baixa?.data}
      carregando={baixa?.isFetching} 
      id={params.id} 
      checaErros={checaErros}
      errors={errors}
      setErrors={setErrors}
      setOpenBaixa={setOpenBaixa}
      carregandoBaixa={enviarBaixa.isLoading}
      />

      <DialogConfirmaBaixa 
      openBaixa={openBaixa}
      setOpenBaixa={setOpenBaixa}
      id={params.id}
      enviaBaixa={() => enviarBaixa.mutate()}
      />
    </>
  );
}

export default Baixa;
