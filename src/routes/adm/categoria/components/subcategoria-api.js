// @ts-nocheck


import { INITIAL_STATE, store } from "./subcategoria-store";


import Api from "../../../../infra/api/api";




export const getObterTodos = async (categoriaId) => {
    try {
      const subcategorias = await Api.get("v1/subcategoria/obter-todos?categoriaId=" + categoriaId,null);

      //debugger;

      store.set({
        ...INITIAL_STATE,
        subcategorias
      });

    } catch (error) {
      console.error(error);
    }
};

export const ObterPor = async (id) => {
    try {
      const response = await Api.get("v1/subcategoria/" + id,null);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const Atualizar = async(data) => {
    try {
      const response = await Api.put("v1/adm/subcategoria/atualizar",data);
      return response;
    } catch (error) {
      return error;
    }
  }
  
  export const Adicionar = async(data) => {
    try {
      const response = await Api.post("v1/adm/subcategoria/adicionar",data);
      return response;
    } catch (error) {
      return error;
    }
  }