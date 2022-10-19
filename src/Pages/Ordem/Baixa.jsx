import React, { useState, useEffect } from 'react';
import BaixaSaidaMaterial from '../../components/BaixaSaidaMaterial';
import DialogConfirmaBaixa from '../../components/DialogConfirmaBaixa';
import { useParams, useNavigate } from 'react-router-dom';

const Baixa = ({ setSnackbar }) => {
  let params = useParams();
  const navigate = useNavigate();
  const [ordemServico, setOrdemServico] = useState({});
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [openBaixa, setOpenBaixa] = useState(false);
  const [carregandoBaixa, setCarregandoBaixa] = useState(false);
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${params.id}`;
    const urlItems = `${process.env.REACT_APP_API_URL}/ordem_servico/${params.id}/items`;
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('access_token'),
        },
    };
  
    setCarregando(true);
  
    fetch(url, options)
      .then(async res => {
        if (res.status === 404) {
          navigate('/404', { replace: true });
          return res.json();
        } else {
          const data = await res.json();
          setOrdemServico(data.data || {});
          fetch(urlItems, options)
            .then(resItems => resItems.json())
            .then(dataItems => {
              setMateriais(dataItems.data);
              setCarregando(false);
            });
        }
      })
      .catch(err => console.log(err));
  }, [params.id, navigate]);

  const enviaBaixa = () => {
    setOpenBaixa(false);

    const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${params.id}/baixa`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token'),
      },
      body: JSON.stringify(items)
    };
  
    setCarregandoBaixa(true);
  
    fetch(url, options)
      .then(res => {
        if (res.ok) {
          setCarregandoBaixa(false);
          setSnackbar({
            open: true,
            severity: 'success',
            message: 'Baixa da ordem de serviço efetuada com sucesso!'
          });
          navigate('/ordemservico', { replace: true });
          return res.json();
        } else {
          setCarregandoBaixa(false);
          setSnackbar({
            open: true,
            severity: 'error',
            message: `Não foi possível efetuar a baixa da ordem de serviço (Erro ${res.status})`
          });
          return res.json();
        }
      })
      .then(data => data)
      .catch(err => console.log(err));
  }

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
    
    setItems({ ordem_servico_items: [...arr] });
    setErrors(objErros);

    if (Object.keys(objErros).length === 0 && Object.keys(errors).length === 0 ) {
      setOpenBaixa(true);
    }
  }

  return (
    <>
      <BaixaSaidaMaterial 
        ordemServico={ordemServico}
        carregando={carregando} 
        id={params.id} 
        materiais={materiais} 
        // setSnackbar={setSnackbar}
        checaErros={checaErros}
        errors={errors}
        setErrors={setErrors}
        setOpenBaixa={setOpenBaixa}
        carregandoBaixa={carregandoBaixa}
      />

      <DialogConfirmaBaixa 
        openBaixa={openBaixa}
        setOpenBaixa={setOpenBaixa}
        id={params.id}
        enviaBaixa={enviaBaixa}
      />
    </>
  );
}

export default Baixa;