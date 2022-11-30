<script>
// @ts-nocheck

import AnuncioCard from "../components/anuncioCard.svelte";

import { store} from "../components/anuncio-store"



export let oque;
export let nacategoria; 




function NextPageIndex()
{
    window.open("/encontre?nacategoria=" +nacategoria + "&oque=" + oque + "&NextPageIndex=" + $store.anuncios.nextPageIndex,"_self");
  
}

function PreviousPageIndex()
{
    window.open("/encontre?nacategoria=" +nacategoria + "&oque=" + oque + "&PreviousPageIndex=" + $store.anuncios.previousPageIndex,"_self");
  
}


</script>

<div class="container text-center">

   
    {#if $store.anuncios.list!=null}
        {#if $store.anuncios.list.length>0}

            {#if $store.anuncios.list.length==1}
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col"></div>
                {#each $store.anuncios.list as anuncio}
                    <div class="col-2">
                        <AnuncioCard 
                        id={anuncio.id}
                        titulo={anuncio.titulo}
                        subTitulo={anuncio.subTitulo}
                        categoriaId={anuncio.categoriaId}
                        subCategoriaId={anuncio.subCategoriaId}
                        site={anuncio.site}
                        facebook={anuncio.facebook}
                        instagram={anuncio.instagram}
                        tags={anuncio.tags}></AnuncioCard>
                    </div>

                    
                {/each}
                <div class="col"></div>
            </div>
            {/if}

            {#if $store.anuncios.list.length==2}
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col"></div>
                {#each $store.anuncios.list as anuncio}
                    <div class="col">
                        <AnuncioCard 
                        id={anuncio.id}
                        titulo={anuncio.titulo}
                        subTitulo={anuncio.subTitulo}
                        categoriaId={anuncio.categoriaId}
                        subCategoriaId={anuncio.subCategoriaId}
                        site={anuncio.site}
                        facebook={anuncio.facebook}
                        instagram={anuncio.instagram}></AnuncioCard>
                    </div>
                {/each}
                <div class="col"></div>
            </div>
            {/if}

            {#if $store.anuncios.list.length==3}
            <div class="row row-cols-1 row-cols-md-3 g-4">
                {#each $store.anuncios.list as anuncio}
                
                    <div class="col">
                        <AnuncioCard 
                        id={anuncio.id}
                        titulo={anuncio.titulo}
                        subTitulo={anuncio.subTitulo}
                        categoriaId={anuncio.categoriaId}
                        subCategoriaId={anuncio.subCategoriaId}
                        site={anuncio.site}
                        facebook={anuncio.facebook}
                        instagram={anuncio.instagram}></AnuncioCard>
                    </div>
                {/each}
            </div>
            {/if}


            {#if $store.anuncios.list.length>=4}
            <div class="row row-cols-1 row-cols-md-4 g-4">
                {#each $store.anuncios.list as anuncio}
                    <div class="col">
                        <AnuncioCard 
                        id={anuncio.id}
                        titulo={anuncio.titulo}
                        subTitulo={anuncio.subTitulo}
                        categoriaId={anuncio.categoriaId}
                        subCategoriaId={anuncio.subCategoriaId}
                        site={anuncio.site}
                        facebook={anuncio.facebook}
                        instagram={anuncio.instagram}></AnuncioCard>
                    </div>
                {/each}
            </div>
            {/if}
        {/if}
    {/if}
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" on:click|preventDefault="{PreviousPageIndex}" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">{$store.anuncios.pageIndex}</a></li>
          <li class="page-item">
            <a href="#" class="page-link"  on:click|preventDefault="{NextPageIndex}"  aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
</div>
