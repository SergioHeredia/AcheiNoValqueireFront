// @ts-nocheck

import { INITIAL_STATE, store } from "./categoria-store";
//import * as fs from 'fs/promises';




import Api from "../../../../infra/api/api";

export const getObterTodos = async (ativo) => {
    try {
      const categorias = await Api.get("v1/categoria/obter-todos?ativo=" + ativo,null);

      //debugger;

      store.set({
        ...INITIAL_STATE,
        categorias
      });

      return categorias;

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

export const AdicionarImagem = async(data) => {
  try {
    const response = await Api.post("v1/adm/categoria/adicionar-imagem",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const Atualizar = async(data) => {
  try {
    const response = await Api.put("v1/adm/categoria/atualizar",data);


    //const categorias = await Api.get("v1/categoria/obter-todos?ativo=true",null);

    //debugger;
//fs.writeFile("static/data2.json", JSON.stringify(categorias));

    return response;
  } catch (error) {
    return error;
  }
}

export const Adicionar = async(data) => {
  try {
    const response = await Api.post("v1/adm/categoria/adicionar",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const Ativar = async(data) => {
  try {
    const response = await Api.put("v1/adm/categoria/ativar",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const Desativar = async(data) => {
  try {
    const response = await Api.put("v1/adm/categoria/desativar",data);
    return response;
  } catch (error) {
    return error;
  }
}
