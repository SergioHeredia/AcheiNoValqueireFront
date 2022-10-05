// @ts-nocheck


import Api from "../../../../infra/api/api";

export const login = async(data) => {
    try {
      const response = await Api.post("v1/entrar",data);
      return response;
    } catch (error) {
      return error;
    }
  }


  export const usuario = async() => {
    try {
      const response = await Api.get("v1/usuario");
      return response;
    } catch (error) {
      return error;
    }
  }
  
