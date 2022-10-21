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
export const enviaForm = (e, materiais, /* profissionais, */ campo) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  formData.append('user_id', localStorage.getItem('user_id'));
  
  if (formData.get('numero_contrato') !== null) 
    formData.set('numero_contrato', formData.get('numero_contrato').replace(/\//gm, '').toUpperCase());
  
  if (formData.get('processo_sei') !== null) 
    formData.set('processo_sei', formData.get('processo_sei').replace(/\D/gm, ''));
  
  if (materiais) {
    materiais.forEach((material, index) => {
      const entries = Object.entries(material);
      entries.forEach(keyValue => {
        formData.append(`${campo}[${index}][${keyValue[0]}]`, keyValue[1]);
      });
    });
  }

  // if (profissionais) {
  //   profissionais.forEach((profissional, index) => {
  //     const entries = Object.entries(profissional);
  //     entries.forEach(keyValue => {
  //       formData.append(`${campo}[${index}][${keyValue[0]}]`, keyValue[1]);
  //     });
  //   });
  // }

  return formData;
}

export const enviaNovoForm = (e, url, paginaAnterior, setCarregando, setOpenConfirmar, navigate, setSnackbar, tipoRegistro, setErrors, materiais, /* profissionais, */ campo) => {
  enviaForm(e, materiais, /* profissionais ,*/ campo)
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}`;
  const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
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
export const getLocais = () => {
  const url = `${process.env.REACT_APP_API_URL}/locais`;
  const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      }
  };

  return fetch(url, options)
      .then(res => {
        return res.json()
      })
      .then(data => data.data)
      .catch(err => console.log(err));
}

export const getTabela = (rota, page, /* setCarregando, setData, setMeta, */ filtros, sort) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}?page=${page}${filtros || ''}&sort=${sort || ''}`
  const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      }
  };

  // setCarregando(true);

  return fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        return new Promise((res) =>  setTimeout(() => {
          res(data)
          // setCarregando(false);
          // setData(data.data);
          // setMeta(data.meta);
        }, 250))}

      )
}

export const getMateriais = (rota, id, setOpen, setCursor, setMateriais) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}/${id}/items`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    }
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
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    }
  };
  
  setCursor('progress');
  
  fetch(url, options)
  .then(res => res.json())
  .then(data => setter(data.data))
  .then(() => { 
    if (setMateriais) {
      getMateriais(rota, id, setOpen, setCursor, setMateriais);
    } else {
      setOpen(true);
      setCursor('auto');
    }
  })
}

export const getItemsAcabando = () => {
  const url = `${process.env.REACT_APP_API_URL}/items_acabando`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    }
  };

  return fetch(url, options)
    .then(res => {
      if (res.ok)
        return res.json();
    })
    .then(data => data.data)
    .catch(err => console.log(err))
}

// Update
export const enviaEdicao = (e, setHouveMudanca, url, id, setCarregando, setOpenEditar, setOpenConfirmar, setSnackbar, tipoRegistro, setErrors, materiais, campo) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}/${id}`;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    },
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
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    },
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
          'Authorization': localStorage.getItem('access_token'),
      },
  };
  
  const res = await fetch(url, options);
  const temp = await res.json();
  return temp.data
}

export const getMatItens = async (tipoRota, ordemServico = false, baseSelecionada, deptoSelecionado) => {
  const url = 
    ordemServico
    ? `${process.env.REACT_APP_API_URL}/base/items?base=${baseSelecionada}&depto=${deptoSelecionado}&tipo=${tipoRota}`
    : `${process.env.REACT_APP_API_URL}/items/tipo/${tipoRota}`
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('access_token'),
      },
  };
  const res = await fetch(url, options);
  return await res.json();
}

export const getProfissionais = async (base, depto) => {
  const profissionais = ['Scarpinha', 'Navagol', 'WesleyShow', 'Rony Rustico', 'Endrick(Bagre)', 'Veiga(Brabo)']

  return await profissionais
}

export const getStatusEnum = async () => {
  const status = ['A iniciar', 'Iniciada', 'Finalizada']
  
  return await status
}

// autorizações
// create
export const authCreateEntrada = (perfil) => {
  switch (perfil) {
    case 'admin':
      return 'flex';
    case 'almoxarife':
      return 'flex';
    case 'encarregado':
      return 'none';
    case 'gestao_mpe':
      return 'none';
    case 'gestao_dgpu':
      return 'none';
    default:
      return 'none';
  }
}

export const authCreateOrdem = (perfil) => {
  switch (perfil) {
    case 'admin':
      return 'flex';
    case 'almoxarife':
      return 'none';
    case 'encarregado':
      return 'none';
    case 'gestao_mpe':
      return 'none';
    case 'gestao_dgpu':
      return 'flex';
    default:
      return 'none';
  }
}

// update
export const authEditEntrada = (perfil) => {
  switch (perfil) {
    case 'admin':
      return '';
    case 'almoxarife':
      return '';
    case 'encarregado':
      return 'none';
    case 'gestao_mpe':
      return 'none';
    case 'gestao_dgpu':
      return 'none';
    default:
      return 'none';
  }
}

export const authEditOrdem = (perfil) => {
  switch (perfil) {
    case 'admin':
      return '';
    case 'almoxarife':
      return 'none';
    case 'encarregado':
      return 'none';
    case 'gestao_mpe':
      return 'none';
    case 'gestao_dgpu':
      return '';
    default:
      return 'none';
  }
}