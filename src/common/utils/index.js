// formatações

import { motivosRecusa } from "./constants";

//recebe o store de materiais, separado pelo tipo, e o formData que sera enviado pela requisicao.
//transfere os itens, sequencialmente, na  configuracao: item[posicao][campo]= valor
export function appendMateriaisToRequest(formData, materiaisTipos, campoMats) {
  let index = 0 // valor para cadastrar itens de tipos diferentes, em sequencia
  Object.values(materiaisTipos)?.forEach((materiais) => {
      materiais.forEach( item => {
        const entries = Object.entries(item);
        entries.forEach((keyValue) => {
          if(keyValue[0] === "quantidade") {
            return
          }
          if(keyValue[0] === "qtd") {
            formData.append(`${campoMats}[${index}][quantidade]`, keyValue[1])
          }
          formData.append(`${campoMats}[${index}][${keyValue[0]}]`, keyValue[1]);
        });
        index++;
      })
    });
}

export function errorBuilder(res, text) {
  const error = new Error(text)
  error.message = text
  error.status = res.status
  error.ok = false
  error.errors = res?.errors ?? "" 
  return error
}

export function formDataToObj(formData, obj) {
  for (let item of formData.entries()) {
    obj[item[0]] = item[1]
  }
  return obj
}

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

export function mascaraMotivoRecusa (motivoRecusa) {
  return motivosRecusa[motivoRecusa]
}

export const formataDateTime = (dateTime) => {
  let data = new Date(dateTime);
  let dataFormatada = data.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    //hour: "2-digit",
    //minute: "2-digit"
  });

  if (dataFormatada === "Invalid Date" || dateTime === null)
    return "";

  return dataFormatada;
}

export const primeiraLetraMaiuscula = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const setFormSnackbar = (setSnackbar, tipoEnvio, options = {
  error: false,
  edit: false,
  status: null,
}) => {
  if(options.error) {
    return setSnackbar({
      open: true,
      severity: 'error',
      message: `Não foi possível ${ options.edit? 'editar' : 'enviar' } (Erro ${options?.status})`
  })
  }
  return setSnackbar({
    open: true,
    severity: 'success',
    message: `${tipoEnvio} ${options.edit? "editada": "enviada"} com sucesso!`
  })
}

// variáveis
export const token = localStorage.getItem('access_token');

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function headerBuilder () {
  return {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('access_token')
  }
}

// Create
export const enviaForm = (e, materiais, campoMats, profissionais, campoProfs) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  formData.append('user_id', localStorage.getItem('user_id'));
  
  if (formData.get('numero_contrato') !== null) 
    formData.set('numero_contrato', formData.get('numero_contrato').replace(/\//gm, '').toUpperCase());
  
  if (formData.get('processo_sei') !== null) 
    formData.set('processo_sei', formData.get('processo_sei').replace(/\D/gm, ''));
  
  if (materiais) 
    appendMateriaisToRequest(formData, materiais, campoMats)
  

  if (profissionais) {
    profissionais?.forEach((profissional, index) => {
      const entries = Object.entries(profissional);
      entries.forEach(keyValue => {
        formData.append(`${campoProfs}[${index}][${keyValue[0]}]`, keyValue[1]);
      });
    });
  }
  return formData;
}

export const enviaNovoForm = async (e, url, materiais, campoMats, profissionais, campoProfs) => {
  enviaForm(e, materiais, campoMats, profissionais, campoProfs)
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}`;
  const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: enviaForm(e, materiais, campoMats, profissionais, campoProfs)
  };

  const res = await fetch(urlCompleta, options)

  if (res.status === 422) {
    throw await res.json()
  } else if(!res.ok) {
    throw res
  }
  return await res.json()
}

// Read
export const getBaixa = async (baixaId) => {
  const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${baixaId}`;
  const urlItems = `${process.env.REACT_APP_API_URL}/ordem_servico/${baixaId}/items`;
  const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headerBuilder()
      },
  };

  const res = await fetch(url, options)
  if(!res.ok) throw res
  const itensRes = await fetch(urlItems, options)
  if(!itensRes.ok) throw errorBuilder(res, "Nao foi possivel recuperaro os itens da baixa!")
  const [ordem, itens] = await Promise.all([res.json(), itensRes.json()])
  return {ordem, itens}

    // .then(async res => {
    //   if (res.status === 404) {
    //     navigate('/404', { replace: true });
    //     return res.json();
    //   } else {
    //     const data = await res.json();
    //     setOrdemServico(data.data || {});
    //     fetch(urlItems, options)
    //       .then(resItems => resItems.json())
    //       .then(dataItems => {
    //         setMateriais(dataItems.data);
    //         setCarregando(false);
    //       });
    //   }
    // })
    // .catch(err => console.log(err));
}

export const getLocais = (depto, tipo) => {
  const url = `${process.env.REACT_APP_API_URL}/locais?filter[tipo]=${tipo}&filter[departamento_id]=${depto}`;
  const options = {
      method: 'GET',
      headers: headerBuilder()
  };

  return fetch(url, options)
      .then(res => {
        return res.json()
      })
      .then( data => data.data )
      .catch(err => console.log(err));
}

export async function getDados(rota) {
  const url = `${process.env.REACT_APP_API_URL}/${rota}`
  const options = { headers: headerBuilder() };

  try{
    const res = await fetch(url, options)
    if(res.status === 404) {
      throw errorBuilder(res, "Nao encontrado")
    }
    return await res.json()
  } catch(e) {
    throw errorBuilder(e, e.message)
  }
}

export async function getTabela (rota, page="", filtros="", sort="") {
  const url = `${process.env.REACT_APP_API_URL}/${rota}?page=${page}${filtros || ''}&sort=${sort || ''}`
  const options = {
      method: 'GET',
      headers: headerBuilder()
  };

  try{
    const res = await fetch(url, options)
    if(res.status === 404) {
      throw errorBuilder(res, "Nao encontrado")
    }
    const json = await res.json()
    return await new Promise(res => setTimeout(() => res(json), 250))
  } catch(e) {
    throw errorBuilder(e, e.message)
  }
}

export const getMateriais = async (rota, id) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}/${id}/items`;
  const options = {
    method: 'GET',
    headers: {
      ...headerBuilder(),
      'Content-Type': 'application/json',
    }
  };

  const res = await fetch(url, options)
  if(res.ok) {
    const json = await res.json()
    return json
  }
  throw errorBuilder(res, "Nao foi possivel recuperar os materiais!")
}

export const getOrdemProfissionais = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${id}/profissionais`;
  const options = {
    method: 'GET',
    headers: headerBuilder() 
  };

  const res = await fetch(url, options)
  if(res.ok) {
    const json = await res.json()
    return json.data
  }
  throw errorBuilder(res, "Nao foi possivel recuperar os profissionais!")
}

export const getRegistro = async (rota, id) => {
  const url = `${process.env.REACT_APP_API_URL}/${rota}/${id}`;
  const options = {
    method: 'GET',
    headers: headerBuilder()
  };
  
  const res = await fetch(url, options)
  if(res.ok) {
    const json = await res.json()
    return json.data
  } else if(res.status === 404) {
    throw errorBuilder(res, "Nao encontrado")
  }
  throw errorBuilder(res, res.message)
}

//export const getDetalhesBaixa = async (id) => {
//  const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${id}/baixa_json`;
//  const options = {
//    method: 'GET',
//    headers: headerBuilder() 
//  };
//
//  const res = await fetch(url, options);
//  if(res.ok) {
//    return await res.json();
//  }
//  throw errorBuilder(res, "Nao foi possivel recuperar a baixa!")
//}

//export const getItemsAcabando = () => {
//  const url = `${process.env.REACT_APP_API_URL}/items_acabando`;
//  const options = {
//    method: 'GET',
//    headers: {
//      ...headerBuilder()
//      //'Accept': 'application/json',
//      //'Authorization': localStorage.getItem('access_token')
//    }
//  };
//
//  return fetch(url, options)
//    .then(res => {
//      if (res.ok)
//        return res.json();
//    })
//    .then( data => data.data )
//    .catch(err => console.log(err))
//}

// Update
export const enviaBaixa = async (items, baixaId) => {
  const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${baixaId}/baixa`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headerBuilder()
      //'Accept': 'application/json',
      //'Authorization': localStorage.getItem('access_token'),
    },
    body: JSON.stringify(items)
  };

  const res = await fetch(url, options)
  if(res.ok) {
    return await res.json()
  } else {
    throw res
  }
      // .then(res => {
      //   if (res.ok) {
      //     setCarregandoBaixa(false);
      //     setSnackbar({
      //       open: true,
      //       severity: 'success',
      //       message: 'Baixa da ordem de serviço efetuada com sucesso!'
      //     });
      //     navigate('/ordemservico', { replace: true });
      //     return res.json();
      //   } else {
      //     setCarregandoBaixa(false);
      //     setSnackbar({
      //       open: true,
      //       severity: 'error',
      //       message: `Não foi possível efetuar a baixa da ordem de serviço (Erro ${res.status})`
      //     });
      //     return res.json();
      //   }
      // })
      // .then(data => data)
      // .catch(err => console.log(err));
}

export const AddAlerta = async (alertaData, idAlerta) => {
  const url = `${process.env.REACT_APP_API_URL}/inventario/${idAlerta}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      header: headerBuilder()
    },
    body: JSON.stringify({
      ...alertaData
    })
  };

  try {
    const res = await fetch(url, options)
    if(res.status === 404) {
      console.log(res)
      throw errorBuilder(res, "Item nao encontrado.")
    }
    return await res.json()
  } catch(e) {
    throw errorBuilder(e, e.message)
  }
  
}



export const enviaEdicao = async (e, url, id, materiais, campo) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}/${id}`;
  const options = {
    method: 'POST',
    headers: {
      ...headerBuilder()
    },
    body: enviaForm(e, materiais, campo) // TODO: implementar edicao de profissionais
  };
  
  const res = await fetch(urlCompleta, options)

  if (res.ok) {
    return await res.json();
  } else if (res.status === 422) {
    const errData = await res.json()
    const error = new Error("Erro")
    error.data = errData
    error.status = res.status

    throw error
  } else {
    // const errData = await res.json()
    throw res
  }
    // .then(data => {
    //   if (data.errors)
    //     // setErrors(data.errors)
    // })
    // .catch(err => console.log(err));
}

// Delete
export const excluiRegistro = (rota, id, /* setHouveMudanca ,*/ setOpenExcluir, setOpenEditar, setCarregando, setSnackbar, tipoRegistro) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${rota}/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      ...headerBuilder()
    },
  };

  setOpenExcluir(false);
  setCarregando(true);

  fetch(urlCompleta, options)
    .then(res => {
      if (res.ok) {
        // setHouveMudanca(prev => !prev);
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
    .catch(err => console.log(err))
}

export const getMatTipos = async () => {
  const url = `${process.env.REACT_APP_API_URL}/tipo_items`;
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          //...headerBuilder()
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('access_token'),
      },
  };
  
  const res = await fetch(url, options);
  if (res.ok) {
    return await res.json();
  }
  throw errorBuilder(res, "Nao foi possivel recuperar os materiais")
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
          ...headerBuilder()
          //'Accept': 'application/json',
          //'Authorization': localStorage.getItem('access_token'),
      },
  };
  return await (await fetch(url, options)).json()
}

export const getProfissionais = async (base, depto) => {
  const url = new URL(
    `${process.env.REACT_APP_API_URL}/profissionais`
  );

  const params = {
      "local": /* base */"",
      "depto": /* depto */"",
  };
  Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));

  const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
  };
  const data = await(await fetch(url, {
      method: "GET",
      headers: headerBuilder(),
  })).json()

  return await data
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

export const authCreateTransf = (perfil) => {
  switch (perfil) {
    case 'almoxarife':
      return true;
    case 'encarregado':
      return true;
    default:
      return false;
  }
}

export const authCreateOcorrencia = (perfil) => {
  switch (perfil) {
    case 'almoxarife':
      return true;
    case 'encarregado':
      return true;
    default:
      return false;
  }
}

export const newPwRequest = async (formData) => {
  const url = new URL( `${process.env.REACT_APP_API_URL}/alterar_senha` );
  
  const data = {...formData, email: localStorage.getItem('usermail')}

  const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headerBuilder()
      },
      body: JSON.stringify(data),
  })
  
  return await res.json()
}

export const loginRequest = async (inputObject) => {
  const url = `${process.env.REACT_APP_API_URL}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(inputObject)
  };

  const res = await fetch(url, options)

  if(res.ok) {
    const data = await res.json()
    data.email = inputObject.email
    return data
  }
  const errData = await res.json()
  throw errorBuilder(res, errData.message)
}

//export async function getTransferencias() {
//  const url = new URL( `${process.env.REACT_APP_API_URL}/transferencia` );
//  const res = await fetch(url, {
//    headers: headerBuilder(), 
//  })
//
//  if(res.ok) return await res.json()
//  
//  throw errorBuilder(res, "Nao foi possivel recuperar a transferencia")
//}
//
//export async function getTransferencia(id) {
//  const url = new URL( `${process.env.REACT_APP_API_URL}/transferencia/${id}` );
//  const res = await fetch(url, {
//    headers: headerBuilder(), 
//  })
//
//  if(res.ok) {
//    return await res.json()
//  } else if (res.status === 404) {
//    throw errorBuilder(res, "Nao encontrado")
//
//  }
//  throw errorBuilder(res, "Nao foi possivel recuperar a transferencia")
//}

export async function getTransferenciaItem(id) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/transferencia_itens/${id}` );
  const res = await fetch(url, {
    headers: headerBuilder(),
  })
  if(res.ok) {
    return await res.json()
  }
  throw errorBuilder(res, "Nao foi possivel recuperar os itens de transferencia")

}

export async function enviaNovaTransferencia(formData, materiais) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/transferencia` );
  appendMateriaisToRequest(formData, materiais, "itens")
  

  const res = await fetch(url, {
    method: "POST",
    headers: headerBuilder(), 
    body: formData,
  })
  if(res.ok) return {message: "Transferencia enviada com sucesso", status: res.status, ok: true}
  
  const json = await res.json()
  const error = errorBuilder(res, "Nao foi possivel enviar a transferencia")
  error.errors = json.errors
  throw error
}

export async function recusaTransferencia(id) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/transferencia/recusar/${id}` );

  const res = await fetch(url, {
    method: "POST",
    headers: headerBuilder(),
  })

  if (res.ok) return res

  const json = await res.json()
  const error = errorBuilder(res, json.mensagem)
  error.errors = json.errors
  
  throw error
}

export async function getOcorrencias() {
  const url = new URL( `${process.env.REACT_APP_API_URL}/ocorrencia` );
  const res = await fetch(url, {
    method: "GET",
    headers: headerBuilder()
  })
  if (res.ok) {
    const json = await res.json()
    return json.ocorrencia
  }
  throw errorBuilder(res, "Nao foi possivel recuperar ocorrencias")
}

export async function getOcorrencia(id) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/ocorrencia/${id}` );
  const res = await fetch(url, {
    headers: headerBuilder(), 
  })

  if(res.ok)  return await res.json() 

  throw errorBuilder(res, "Nao foi possivel enviar a transferencia")
}

export async function getOcorrenciaPDF(id) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/ocorrencia_pdf/${id}` );
  const headers = {
      "Accept": "application/pdf",
      "Authorization": localStorage.getItem('access_token'),
  };

  const res = await fetch(url, {
    headers: headers, 
  })

  if(res.ok) return res
  
  throw errorBuilder(res, "Nao foi possivel enviar a transferencia")
}

export async function enviaNovaOcorrencia(formData, materiais) {
  formData.append("justificativa", "string")
  appendMateriaisToRequest(formData, materiais, "itens")
  const url = new URL( `${process.env.REACT_APP_API_URL}/ocorrencia` );

  const res = await fetch(url, {
    method: "POST",
    headers: headerBuilder(),
    body: formData 
  })

  if(res.ok) return res

  const json = await res.json()
  const error = errorBuilder(res, json.mensagem)
  error.errors = json.errors
  
  throw error
}

export async function confirmaTransferencia(id_transferencia) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/transferir_itens/${id_transferencia}` );
  const res = await fetch(url, {
    method: "POST",
    headers: headerBuilder(),
    body: JSON.stringify({status: "recebido"})
  })

  const json = await res.json()
  if(res.ok) return

  throw errorBuilder(res, json.mensagem)
}

export function isAllowedTransf() {
  const perfil = localStorage.getItem("perfil");
  switch(perfil) {
    case 'almoxarife':
      return true;
    case 'encarregado':
      return true;
    default:
      return false;
  }
}