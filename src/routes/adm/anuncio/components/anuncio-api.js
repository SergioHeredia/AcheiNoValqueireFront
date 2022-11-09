// @ts-nocheck

import { INITIAL_STATE, store } from "./anuncio-store";

import {  store as store2 } from "./anuncioimg-store";



import Api from "../../../../infra/api/api";


export const EdicaoObterPor = async (id) => {
  try {
    const response = await Api.get("v1/adm/anuncio/edicao/" + id,null);
    return response;
  } catch (error) {
    return error;
  }
};

export const Atualizar = async(data) => {
  try {
    
      store.set({
        ...INITIAL_STATE,
      });
    

    const response = await Api.put("v1/adm/anuncio/atualizar",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const Adicionar = async(data) => {
  try {
    store.set({
      ...INITIAL_STATE,
    });
    const response = await Api.post("v1/adm/anuncio/adicionar",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const AdicionarImagem = async(data) => {
  try {
    const response = await Api.post("v1/adm/anuncio/adicionar-imagem",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const MarcarImagemExcluir = async(data) => {
  try {
    const response = await Api.put("v1/adm/anuncio/marcar-imagem-excluir",data);
    return response;
  } catch (error) {
    return error;
  }
}

export const Publicar = async(data) => {
  try {
    const response = await Api.put("v1/adm/anuncio/Publicar",data);
    return response;
  } catch (error) {
    return error;
  }
}




export const ObterTodosCompleto = async (pageSize,pageIndex,query=null,categoriaId=null,ativo=true,destaque=false,aleatorio=false,producao=true) => {
  try {

    store.set({
      ...INITIAL_STATE,
    });

    const anuncios = await Api.get("v1/adm/anuncio?pageSize=" + pageSize + "&pageIndex=" + pageIndex + "&query=" + query + "&categoriaId=" + categoriaId + "&ativo=" + ativo + "&destaque=" + destaque + "&aleatorio=" + aleatorio + "&producao=" + producao,null);
    //debugger;

    store.set({
      ...INITIAL_STATE,
      anuncios
    });


   
  } catch (error) {
    return error;
  }
};

export const ListarImagensEdicao = async (anuncioid) => {
  try {
    const anuncioimg = await Api.get("v1/adm/anuncio/listar-imagem-edicao?anuncioId=" + anuncioid,null);

    
    //debugger;

    store2.set({
      ...INITIAL_STATE,
      anuncioimg
    });


    //return response;
  } catch (error) {
    return error;
  }
};


export const  ImagemProducao = async (anuncioid) => {
  try {
    return await Api.get("v1/adm/anuncio/imagem-producao?anuncioId=" + anuncioid);

  } catch (error) {
    return error;
  }
};



export const ObterTotalPor = async (categoriaId=null,producao=true) => {
  try {

  

    const data = await Api.get("v1/adm/anuncio/obter-total-por?categoriaId=" + categoriaId + "&producao=" + producao);
    return data


   
  } catch (error) {
    return error;
  }
};
