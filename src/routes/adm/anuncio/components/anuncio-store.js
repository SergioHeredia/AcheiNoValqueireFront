import { writable, derived } from "svelte/store";



export const INITIAL_STATE = {
  anuncios: []
  };

export const store = writable({ ...INITIAL_STATE });



export const anuncios = derived(store, (store) => {
  

    return store.anuncios;
    
  });
  