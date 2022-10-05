// @ts-nocheck

import Api from "../infra/api/api";



export const getObterTodos = async (ativo) => {
    try {
      const categorias = await Api.get("v1/categoria/obter-todos?ativo=" + ativo,null);

      //debugger;

      return categorias

    } catch (error) {
      console.error(error);
    }
};


export const ObterPor = async (id) => {
  try {
    const response = await Api.get("v1/categoria/" + id,null);
    return response;
  } catch (error) {
    return error;
  }
};
