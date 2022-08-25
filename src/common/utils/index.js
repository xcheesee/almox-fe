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

  console.log({
      ...inputObject,
      materiais: [...materiais]
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