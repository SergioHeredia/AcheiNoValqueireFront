// @ts-nocheck

import Api from "../infra/api/api";

import { INITIAL_STATE, store } from "./anuncio-store";


export const ObterTodos = async (pageSize=5,pageIndex=1,query=null,categoriaId=null,destaque=false,aleatorio = false) => {
    try {
            
            var param = "";

            

            if (query!=null ) param+="&query=" + query;

            if (categoriaId!=null) param+="&categoriaId=" + categoriaId;

            if ((query==null || query=="" ) && (categoriaId==null || categoriaId=="")) 
            { 
              destaque=true;
              aleatorio=true;
            }
     

            store.set({
              ...INITIAL_STATE,
            });
        
            const anuncios = await Api.get("v1/anuncio?pageSize=" + pageSize + "&pageIndex=" + pageIndex + param + "&destaque=" + destaque + "&aleatorio=" + aleatorio,null);
            //debugger;
        
            store.set({
              ...INITIAL_STATE,
              anuncios
            });
  
     
    } catch (error) {
      return error;
    }
  };


  export const ObterTodosDestaque = async (pageSize=5,pageIndex=1,query=null,categoriaId=null,destaque=false,aleatorio = false) => {
    try {
            
            var param = "";

            

            if (query!=null) param+="&query=" + query;

            if (categoriaId!=null) param+="&categoriaId=" + categoriaId;

            
        
            const anuncios = await Api.get("v1/anuncio?pageSize=" + pageSize + "&pageIndex=" + pageIndex + param + "&destaque=" + destaque + "&aleatorio=" + aleatorio,null);
            //debugger;
        
           return anuncios
  
     
    } catch (error) {
      return error;
    }
  };

  export const  ImagemProducao = async (anuncioid) => {
    try {
      return await Api.get("v1/anuncio/listar-imagem-producao?anuncioId=" + anuncioid);
  
    } catch (error) {
      return error;
    }
  };


  
export const ObterPor = async (id) => {
  try {
    const response = await Api.get("v1/anuncio/" + id,null);
    return response;
  } catch (error) {
    return error;
  }
};