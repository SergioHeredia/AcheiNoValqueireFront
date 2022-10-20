// https://dev.to/lukocastillo/svelte-3-how-to-connect-your-app-with-a-rest-api-axios-2h4e


import axios from "axios";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL : "http://www.acheinovalqueire.com.br:5010/api/" // it's not recommended to have this info here.
});

axios.defaults.withCredentials = true;

// implement a method to execute all the request from here.

const apiRequest = (method: any, url: any, request: any) => {

  const jwt = localStorage.getItem('jwt');
  //console.log(jwt);

  let _authorization = ""

  if (jwt!=null) 
  {
      axios.defaults.withCredentials = true;
      _authorization = "Bearer " + jwt
  }
  else
    axios.defaults.withCredentials = false;
  


    const headers = {
        authorization: _authorization,
    };
    //using the axios instance to perform the request that received from each http method
    return axiosAPI({
        method,
        url,
        data: request,
        headers
      }).then(res => {
        
        return Promise.resolve(res.data);
      })
      .catch(err => {
        //console.log(err);
        return Promise.reject(err);
      });
};

// function to execute the http get request
// @ts-ignore
const get = (url, request) => apiRequest("get",url,request);

// function to execute the http delete request
// @ts-ignore
const deleteRequest = (url, request) =>  apiRequest("delete", url, request);

// function to execute the http post request
// @ts-ignore
const post = (url, request) => apiRequest("post", url, request);

// function to execute the http put request
// @ts-ignore
const put = (url, request) => apiRequest("put", url, request);

// function to execute the http path request
// @ts-ignore
const patch = (url, request) =>  apiRequest("patch", url, request);

// expose your method to other services or actions
const API ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;
