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

export const enviaForm = (e, materiais) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const inputObject = Object.fromEntries(formData);
  const user_id = localStorage.getItem('user_id');

  console.log({
      ...inputObject,
      materiais: [...materiais],
      user_id: user_id
  });
}

export const token = localStorage.getItem('access_token');

export const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': token
  }
};

export const getTabela = (rota, page, setCarregando, setData, setMeta) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}?page=${page}`
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
      });
};