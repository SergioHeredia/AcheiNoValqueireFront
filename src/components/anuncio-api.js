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

export const TotalViewTelefone = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalviewtelefone",data);
    return response;
  } catch (error) {
    return error;
  }
};

export const TotalClickTelefone1 = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclicktelefone1",data);
    return response;
  } catch (error) {
    return error;
  }
};

export const TotalClickTelefone2 = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclicktelefone2",data);
    return response;
  } catch (error) {
    return error;
  }
};

export const TotalClickFacebook = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclickfacebook",data);
    return response;
  } catch (error) {
    return error;
  }
};

export const TotalClickInstagram = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclickinstagram",data);
    return response;
  } catch (error) {
    return error;
  }
};


export const TotalClickSite = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclicksite",data);
    return response;
  } catch (error) {
    return error;
  }
};

export const TotalClickTiktok = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclicktiktok",data);
    return response;
  } catch (error) {
    return error;
  }
};

export const TotalClickTwitter = async (data) => {
  try {
    const response = await Api.put("v1/anuncio/totalclicktwitter",data);
    return response;
  } catch (error) {
    return error;
  }
};