// @ts-nocheck

import Api from "../infra/api/api";





export const ObterPor = async (id) => {
  try {
    const response = await Api.get("v1/subcategoria/" + id,null);
    return response;
  } catch (error) {
    return error;
  }
};
