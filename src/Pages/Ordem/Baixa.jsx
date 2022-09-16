import React, { useState, useEffect } from 'react';
import { headers } from '../../common/utils';
import BaixaSaidaMaterial from '../../components/BaixaSaidaMaterial';
import { useParams, useNavigate } from 'react-router-dom';

const Baixa = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [ordemServico, setOrdemServico] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${params.id}`
    const options = {
        method: 'GET',
        headers: headers
    };
  
    setCarregando(true);
  
    fetch(url, options)
      .then(res => {
        if (res.status === 404) {
          navigate('/404', { replace: true });
          return res.json();
        } else {
          return res.json();
        }
      })
      .then(data => { 
        setCarregando(false);
        setOrdemServico(data.data || {}); 
      });
  }, [params, navigate]);


  return (
    <BaixaSaidaMaterial ordemServico={ordemServico} carregando={carregando} id={params.id} />
  );
}

export default Baixa;