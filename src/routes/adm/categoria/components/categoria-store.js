import { writable, derived } from "svelte/store";



export const INITIAL_STATE = {
  categorias: []
  };

export const store = writable({ ...INITIAL_STATE });



export const categorias = derived(store, (store) => {
  

    return store.categorias;
    //   .filter((movie) => movie.backdrop_path != null)
    //   .map((movie) => {
    //     movie.friendly_date = new Date(movie.release_date).toLocaleDateString();
    //     return movie;
    //  });
  });
  