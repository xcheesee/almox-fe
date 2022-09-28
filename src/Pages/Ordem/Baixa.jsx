import React, { useState, useEffect } from 'react';
import { headers } from '../../common/utils';
import BaixaSaidaMaterial from '../../components/BaixaSaidaMaterial';
import { useParams, useNavigate } from 'react-router-dom';

const Baixa = ({ setSnackbar }) => {
  let params = useParams();
  const navigate = useNavigate();
  const [ordemServico, setOrdemServico] = useState({});
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${params.id}`;
    const urlItems = `${process.env.REACT_APP_API_URL}/ordem_servico/${params.id}/items`;
    const options = {
        method: 'GET',
        headers: headers
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
  }, [params, navigate]);

  return (
    <BaixaSaidaMaterial 
      ordemServico={ordemServico}
      carregando={carregando} 
      id={params.id} 
      materiais={materiais} 
      setSnackbar={setSnackbar}  
    />
  );
}

export default Baixa;