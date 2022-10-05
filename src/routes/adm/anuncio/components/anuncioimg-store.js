import { writable, derived } from "svelte/store";



export const INITIAL_STATE = {
  anuncioimg: []
  };

export const store = writable({ ...INITIAL_STATE });



export const anuncioimg = derived(store, (store) => {

    return store.anuncioimg;
    
  });
  