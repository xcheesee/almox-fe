export const mascaraProcessoSei = (processoSei) => {
    if (processoSei !== null && processoSei !== "" && processoSei !== undefined)
      return processoSei.replace(/([\d]{4})([\d]{4})([\d]{7})([\d]{1})/gm, '$1.$2/$3-$4');
    else
      return "";
}

export const mascaraContrato = (contrato) => {
    if (contrato !== null && contrato !== "" && contrato !== undefined) 
        return contrato.replace(/([\d]{3})([\w]{4})(\d{4})/gm, '$1/$2/$3');
    else
        return "";
}

export const formataDateTime = (dateTime) => {
  let data = new Date(dateTime);
  let dataFormatada = data.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  if (dataFormatada === "Invalid Date")
    return "---";

  return dataFormatada;
}

export const token = localStorage.getItem('access_token');

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getTabela = (rota, page, setCarregando, setData, setMeta, filtros) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}?page=${page}${filtros}`
  console.log(url)
  const options = {
      method: 'GET',
      headers: headers
  };

  setCarregando(true);

  fetch(url, options)
      .then(res => res.json())
      .then(data => {
          setCarregando(false);
          setData(data.data);
          setMeta(data.meta);
          console.log(data)
      });
}

export const enviaForm = (e, materiais) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  formData.append('user_id', localStorage.getItem('user_id'));
  
  if (materiais) {
    materiais.forEach((material, index) => {
      const entries = Object.entries(material);
      entries.forEach(keyValue => {
        formData.append(`entrada_items[${index}][${keyValue[0]}]`, keyValue[1]);
      });
    });
  }
  
  return formData;
}

export const enviaNovoForm = (e, url, paginaAnterior, setCarregando, setOpenConfirmar, navigate, materiais) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}`;
  const options = {
      method: 'POST',
      headers: headers,
      body: enviaForm(e, materiais)
  };

  setCarregando(true);
  setOpenConfirmar(false);

  fetch(urlCompleta, options)
      .then(res => { 
          if (res.ok) {
              setCarregando(false);
              navigate(`/${paginaAnterior}`, { replace: true });
              return res.json();
          } else {
              setCarregando(false);
          }
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
}