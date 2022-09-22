// formatações
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

  if (dataFormatada === "Invalid Date" || dateTime === null)
    return "";

  return dataFormatada;
}

export const primeiraLetraMaiuscula = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// variáveis
export const token = localStorage.getItem('access_token');

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// Create
export const enviaForm = (e, materiais, campo) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  formData.append('user_id', localStorage.getItem('user_id'));
  
  if (materiais) {
    materiais.forEach((material, index) => {
      const entries = Object.entries(material);
      entries.forEach(keyValue => {
        formData.append(`${campo}[${index}][${keyValue[0]}]`, keyValue[1]);
      });
    });
  }
  
  return formData;
}

export const enviaNovoForm = (e, url, paginaAnterior, setCarregando, setOpenConfirmar, navigate, setSnackbar, tipoRegistro, setErrors, materiais, campo) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}`;
  const options = {
      method: 'POST',
      headers: headers,
      body: enviaForm(e, materiais, campo)
  };

  setCarregando(true);
  setOpenConfirmar(false);

  fetch(urlCompleta, options)
      .then(res => { 
        if (res.ok) {
            setCarregando(false);
            navigate(`/${paginaAnterior}`, { replace: true });
            setSnackbar({
                open: true,
                severity: 'success',
                message: `${tipoRegistro} enviada com sucesso!`
            });
            return res.json();
        } else if (res.status === 422) {
            setCarregando(false);
            setSnackbar({
                open: true,
                severity: 'error',
                message: `Não foi possível enviar (Erro ${res.status})`
            });
            return res.json();
        } else {
            setCarregando(false);
            setSnackbar({
                open: true,
                severity: 'error',
                message: `Não foi possível enviar (Erro ${res.status})`
            });
        }
      })
      .then(data => {
        if (data.errors)
          setErrors(data.errors)
      })
      .catch(err => console.log(err));
}

// Read
export const getLocais = (setCarregando, setLocais) => {
  const url = `${process.env.REACT_APP_API_URL}/locais`;
  const options = {
      method: 'GET',
      headers: headers
  };

  setCarregando(true);

  fetch(url, options)
      .then(res => {
          setCarregando(false);
          return res.json()
      })
      .then(data => setLocais([...data.data]))
      .catch(err => console.log(err));
}

export const getTabela = (rota, page, setCarregando, setData, setMeta, filtros) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}?page=${page}${filtros || ''}`
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
}

export const getMateriais = (rota, id, setMateriais, setOpen, setCursor) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}/${id}/items`;
  const options = {
    method: 'GET',
    headers: headers
  };

  fetch(url, options)
    .then(res => res.json())
    // .then(data => {
    //   let arr = [];
    //   let items = data.data;

    //   items.forEach(item => arr.push({ id: item.item_id, quantidade: item.quantidade }));

    //   setMateriais([...arr]);
    // })
    .then(data => {
      setMateriais(data.data);
      setOpen(true);
      setCursor('auto');
    })
}

export const getRegistro = (rota, id, setOpen, setter, setCursor, setMateriais) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}/${id}`;
  const options = {
    method: 'GET',
    headers: headers
  };
  
  setCursor('progress');
  
  fetch(url, options)
  .then(res => res.json())
  .then(data => setter(data.data))
  .then(() => { 
    getMateriais(rota, id, setMateriais, setOpen, setCursor);
  })
}

// Update
export const enviaEdicao = (e, setHouveMudanca, url, id, setCarregando, setOpenEditar, setOpenConfirmar, setSnackbar, tipoRegistro, setErrors, materiais, campo) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}/${id}`;
  const options = {
    method: 'POST',
    headers: headers,
    body: enviaForm(e, materiais, campo)
  };

  setCarregando(true);
  setOpenConfirmar(false);

  fetch(urlCompleta, options)
    .then(res => {
      if (res.ok) {
        setHouveMudanca(prev => !prev);
        setOpenEditar(false);
        setCarregando(false);
        setSnackbar({
          open: true,
          severity: 'success',
          message: `${tipoRegistro} editada com sucesso!`
        });
        return res.json();
      } else if (res.status === 422) {
        setCarregando(false);
        setSnackbar({
            open: true,
            severity: 'error',
            message: `Não foi possível editar (Erro ${res.status})`
        });
        return res.json();
      } else {
        setCarregando(false);
        setSnackbar({
          open: true,
          severity: 'error',
          message: `Não foi possível editar (Erro ${res.status})`
        });
      }
    })
    .then(data => {
      if (data.errors)
        setErrors(data.errors)
    })
    .catch(err => console.log(err));
}

// Delete
export const excluiRegistro = (rota, id, setHouveMudanca, setOpenExcluir, setOpenEditar, setCarregando, setSnackbar, tipoRegistro) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${rota}/${id}`;
  const options = {
    method: 'DELETE',
    headers: headers,
  };

  setOpenExcluir(false);
  setCarregando(true);

  fetch(urlCompleta, options)
    .then(res => {
      if (res.ok) {
        setHouveMudanca(prev => !prev);
        setOpenEditar(false);
        setCarregando(false);
        setSnackbar({
          open: true, 
          severity: 'success', 
          message: `${tipoRegistro} excluída com sucesso!`
        });
        return res.json()
      } else {
        setCarregando(false);
        setSnackbar({
          open: true,
          severity: 'error',
          message: `Não foi possível excluir (Erro ${res.status})`
        });
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

export const getMatTipos = async () => {
  const url = `${process.env.REACT_APP_API_URL}/tipo_items`;
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  };
  const res = await fetch(url, options);
  return await res.json();
}

export const getMatItens = async (tipoRota) => {
  const url = `${process.env.REACT_APP_API_URL}/items/tipo/${tipoRota}`;
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  };
  const res = await fetch(url, options);
  return await res.json();
}