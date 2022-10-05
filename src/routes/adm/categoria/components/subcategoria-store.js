import { writable, derived } from "svelte/store";



export const INITIAL_STATE = {
  subcategorias: []
  };

export const store = writable({ ...INITIAL_STATE });



export const subcategorias = derived(store, (store) => {
  

    return store.subcategorias;
    
  });
  