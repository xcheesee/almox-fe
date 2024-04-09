import { motivosRecusa } from "./constants";

export function errorBuilder(res, text) {
  const error = new Error(text)
  error.message = text
  error.status = res.status
  error.ok = false
  error.errors = Object?.values(res?.errors ?? {})?.reduce((prev, curr) => prev + `${curr}\n`, "") ?? "" 
  return error
}

export function formDataToObj(formData, obj) {
  for (let item of formData.entries()) {
    obj[item[0]] = item[1]
  }
  return obj
}

export function objToArr(materiaisTipos) {
  return [].concat(...Object.values(materiaisTipos)) 
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

export function headerBuilder () {
  return {
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('access_token')
  }
}
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                                formatações                                               */
/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/

//recebe o store de materiais, separado pelo tipo, e o formData que sera enviado pela requisicao.
//transfere os itens, sequencialmente, na  configuracao: item[posicao][campo]= valor

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
  });

  if (dataFormatada === "Invalid Date" || dateTime === null)
    return "";

  return dataFormatada;
}

export const primeiraLetraMaiuscula = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatProfissional(profissionais) {
    let inputFormatado = {}
    let arr = []
    for(let profissional of profissionais) {
        inputFormatado = {
            nome: profissional.profissional,
            horas_empregadas: profissional.horas_empregadas,
            id: profissional.profissional_id,
            data_inicio: profissional.data_inicio
        }
        arr.push(inputFormatado)
    }
    return arr
}


/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   
/*                                       Create                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   

export const enviaForm = (formData) => {
  formData.append('user_id', localStorage.getItem('user_id'));
  
  if (formData.get('numero_contrato') !== null) 
    formData.set('numero_contrato', formData.get('numero_contrato').replace(/\//gm, '').toUpperCase());
  
  if (formData.get('processo_sei') !== null) 
    formData.set('processo_sei', formData.get('processo_sei').replace(/\D/gm, ''));
  
  return formData;
}

export const enviaNovoForm = async (formData, url) => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}`;
  const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: enviaForm(formData)
  };

  const res = await fetch(urlCompleta, options)

  if (res.status === 422) {
    throw await res.json()
  } else if(!res.ok) {
    throw res
  }
  return await res.json()
}

export async function enviaNovaSaida({ formData }) { 
  const url = `${process.env.REACT_APP_API_URL}/saida`;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': localStorage.getItem('access_token')
    },
    body: formData,
  }
  try {
    const res = await fetch(url, options)
    const json = await res.json()
    if(!res.ok) throw errorBuilder(res, json.message)
  } catch(e) {
    throw errorBuilder(e, e.message)
  }
}

export async function enviaNovaOcorrencia(formData) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/ocorrencia` );

  const res = await fetch(url, {
    method: "POST",
    headers: headerBuilder(),
    body: formData 
  })

  if(res.ok) return res

  const json = await res.json()
  //const error = errorBuilder(res, json.mensagem)
  //error.errors = json.errors
  
  throw json;
}

export async function enviaNovaTransferencia(formData) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/transferencia` );

  const res = await fetch(url, {
    method: "POST",
    headers: headerBuilder(), 
    body: formData,
  })

  if(res.ok) return {message: "Transferencia enviada com sucesso", status: res.status, ok: true}
  
  const json = await res.json()
  throw json
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   
/*                                       Read                                                         */
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   

export async function AuthRequest() {
  const url = `${process.env.REACT_APP_API_URL}/perfil`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headerBuilder()
    },
  }
  const res = await fetch(url, options)
  if(res.status === 401) throw res
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

  const [res, itensRes] = await Promise.all([fetch(url, options), fetch(urlItems, options)])
  if(res.status === 401 || itensRes.status === 401) throw res
  if(!res.ok) throw errorBuilder(res, "Nao foi possivel recuperar a baixa!")
  if(!itensRes.ok) throw errorBuilder(res, "Nao foi possivel recuperar os itens da baixa!")

  const [ordem, itens] = await Promise.all([res.json(), itensRes.json()])
  return {ordem, itens}
}

export async function getLocais (depto, tipo, restrito) {
  const url = `${process.env.REACT_APP_API_URL}/locais?autenticado=${restrito}&filter[tipo]=${tipo}&filter[departamento_id]=${depto}`;
  const options = {
    method: 'GET',
    headers: headerBuilder()
  };

  const res = await fetch(url, options)
  if(res.status === 401) 
    throw res 
  else if(!res.ok) 
    throw errorBuilder(res, "Nao foi possivel recuperar os locais")
  
  return (await res.json()).data
}

export async function getDados(rota) {
  const url = `${process.env.REACT_APP_API_URL}/${rota}`
  const options = { headers: headerBuilder() };

  try{
    const res = await fetch(url, options);
    if(!res.ok) throw res; 
    return await res.json();
  } catch(e) {
    if(e.status === 401) {
        throw e;
    }
    throw errorBuilder(e, e.message);
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
    const json = await res.json()
    if(res.status === 404) {
      throw errorBuilder(res, "Nao encontrado")
    } else if(res.status === 401) {
        throw res
    } else if(!res.ok) {
      throw errorBuilder(res, json.message)
    }
    return await new Promise(res => setTimeout(() => res(json), 250))
  } catch(e) {
    if(e.status === 401) {
        throw e
    }
    throw errorBuilder(e, e.message)
  }
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
    throw errorBuilder(res, "Não encontrado")
  }
  throw errorBuilder(res, res.message)
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
    return json.data
  }
  throw errorBuilder(res, "Nao foi possivel recuperar os materiais!")
}

export const getMatTipos = async ({
    depto=""
}) => {
  const url = `${process.env.REACT_APP_API_URL}/tipo_items/${depto}`;
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          ...headerBuilder()
      },
  };
  
  const res = await fetch(url, options);
  if (res.ok) return await res.json();

  throw errorBuilder(res, "Nao foi possivel recuperar os materiais")
}

export const getTipoServicos = async ({
    depto=""
}) => {
  const url = `${process.env.REACT_APP_API_URL}/tipo_servicos/${depto}`;
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          ...headerBuilder()
      },
  };
  
  const res = await fetch(url, options);
  if (res.ok) return await res.json();

  throw errorBuilder(res, "Nao foi possivel recuperar os tipos de serviço")
}

export const getMatItens = async (tipoRota, ordemServico=false, baseSelecionada, deptoSelecionado) => {
  const url = 
    ordemServico
      ? `${process.env.REACT_APP_API_URL}/base/items?base=${baseSelecionada}&depto=${deptoSelecionado}&tipo=${tipoRota}`
      : `${process.env.REACT_APP_API_URL}/items/tipo/${tipoRota}`
  const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          ...headerBuilder()
      },
  };
  const res = await fetch(url, options)
  if(!res.ok) throw errorBuilder(res, "Nao foi possivel recuperar os Itens!"); 

  return await res.json()
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

export async function getOrdemDados (id, tipoDados) {
  const url = `${process.env.REACT_APP_API_URL}/ordem_servico/${id}/${tipoDados}`;
  const options = {
    method: 'GET',
    headers: headerBuilder() 
  };

  const res = await fetch(url, options)
  if(res.ok) {
    const json = await res.json()
    return json.data
  }
  throw errorBuilder(res, `Nao foi possivel recuperar os ${tipoDados}!`)
}
export const getProfissionais = async (base, depto) => {
  const url = new URL(
    `${process.env.REACT_APP_API_URL}/profissionais`
  );

  const params = {
      "local": /* base */"", //argumentos retirados para fins de teste
      "depto": /* depto */"",
  };
  Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));

  const res = await fetch(url, {
      method: "GET",
      headers: headerBuilder(),
  })

  if(!res.ok) throw errorBuilder(res, "Nao foi possivel recuperar os profissionais!")

  return await res.json()
}

export const getStatusEnum = async () => {
  const status = ['A iniciar', 'Iniciada', 'Finalizada']
  
  return await status
}

export async function getTiposServico({depto=""}) {
  const url = new URL(
    `${process.env.REACT_APP_API_URL}/tipo_servicos/${depto}`
  );

  const res = await fetch(url, {
      method: "GET",
      headers: headerBuilder(),
  })

  if(!res.ok) throw errorBuilder(res, "Nao foi possivel recuperar os tipos de servicos!")

  return await res.json()
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   
/*                                       Update                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   

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

export const enviaBaixa = async (items, baixaId) => {
  const url = `${process.env.REACT_APP_API_URL}/saida/${baixaId}/baixa`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headerBuilder()
    },
    body: JSON.stringify(items)
  };

  const res = await fetch(url, options)
  if(res.ok) {
    return await res.json()
  } else {
    throw res
  }
}

export const enviaEdicao = async (formData, url, id)  => {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${url}/${id}`;
  const options = {
    method: 'POST',
    headers: headerBuilder() ,
    body: enviaForm(formData)
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
    throw errorBuilder(res, "Nao foi possivel editar o item!")
  }
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
      throw errorBuilder(res, "Item nao encontrado.")
    }
    return await res.json()
  } catch(e) {
    throw errorBuilder(e, e.message)
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
  if(!res.ok) throw errorBuilder(res, "Nao foi possivel redefinir sua senha!"); 
  
  return await res.json()
}

export async function editaSaida({id, formData}) {
  const url = new URL( `${process.env.REACT_APP_API_URL}/saida/${id}` );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...headerBuilder()
    },
    body: formData,
  })
  const json = await res.json()
  
  if(!res.ok) {
    throw errorBuilder(json, json.message)
  }


  return await json
} 

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   
/*                                       Delete                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   

export async function excluiRegistro ( rota, id ) {
  const urlCompleta = `${process.env.REACT_APP_API_URL}/${rota}/${id}`;
  const options = {
    method: 'DELETE',
    headers: headerBuilder() ,
  };

  const res = await fetch(urlCompleta, options)
  if(!res.ok) {
    throw errorBuilder(res, "Nao foi possivel excluir o registro!")
  }
  return res
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   
/*                                       Auth                                                         */
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/   
// CREATE
export const authCreateEntrada = (perfil) => {
  switch (perfil) {
    case 'admin':
    case 'almoxarife':
      return 'flex';
    default:
      return 'none';
  }
}

export const authCreateOrdem = (perfil) => {
  switch (perfil) {
    case 'admin':
    case 'gestao_dgpu':
      return 'flex';
    default:
      return 'none';
  }
}

export const authCreateTransf = (perfil) => {
  switch (perfil) {
    case 'almoxarife':
    case 'encarregado':
    case 'admin': //perfil adicionado para fins de teste
        return true;
    default:
        return false;
  }
}

export const authCreateOcorrencia = (perfil) => {
  switch (perfil) {
    case 'almoxarife':
    case 'encarregado':
    case 'admin': //perfil adicionado para fins de teste
        return true;
    default:
        return false;
  }
}

export function isAllowedTransf() {
  const perfil = localStorage.getItem("perfil");
  switch(perfil) {
    case 'almoxarife':
    case 'encarregado':
    case 'admin': //perfil adicionado para fins de teste
      return true;
    default:
      return false;
  }
}

// UPDATE
export const authEditEntrada = (perfil) => {
  switch (perfil) {
    case 'admin':
    case 'almoxarife':
      return '';
    default:
      return 'none';
  }
}

export const authEditOrdem = (perfil) => {
  switch (perfil) {
    case 'admin':
    case 'gestao_dgpu':
      return '';
    default:
      return 'none';
  }
}