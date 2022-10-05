<script>

    // @ts-nocheck
    import Aguarde from "../../../../components/aguarde.svelte";
    
    import { ImagemProducao } from "../components/anuncio-api";
    import { anuncioimg } from "../components/anuncioimg-store";
    export let anuncio;

    import { onMount } from 'svelte';


    let imgAnuncio = [];
    onMount(async () => {
		const res = await ImagemProducao(anuncio.id);
		
		imgAnuncio = await res;
       
	});
   
   
</script>

<style>
img{
    max-height: 170px;
    
}
   
</style>



<div class="col">
    <div class="card h-100">
        <div class="card-header">
            <h5 class="card-title btn">{anuncio.titulo==null?anuncio.titulo_preview:anuncio.titulo}</h5>
          </div>
        {#if imgAnuncio.img!=null}
            <a  href="/adm/anuncio/{anuncio.id}">           
                <img class="card-img-top" src="{imgAnuncio.img}" alt="{anuncio.titulo}-{imgAnuncio.img}">
            </a>
        {:else}
            <a  href="/adm/anuncio/{anuncio.id}">  
                <img class="card-img-top" src="/assets/img/items/list-item-1.png" alt="Sem imagem">
            </a>
        {/if}
            <ul class="list-group list-group-flush">
                <li class="list-group-item text-black-50">{anuncio.categoria==null?anuncio.categoria_preview:anuncio.categoria} >> {anuncio.subCategoria==null?(anuncio.subCategoria_preview==null?"":anuncio.subCategoria_preview):anuncio.subCategoria}</li>
                <li class="list-group-item text-right">

                            {#if anuncio.site!="" && anuncio.site!=null}
                            <a href="{anuncio.site}" class="fa-solid fa-earth-americas"> 
                                </a>
                            {:else}
                            <span class="fa-solid fa-earth-americas"> 
                            </span>
                            {/if}

                            {#if anuncio.instagram!="" && anuncio.instagram!=null}
                            <a href="{anuncio.instagram}" class="fa-brands fa-square-instagram">
                            </a>
                            {:else}
                            <span class="fa-brands fa-square-instagram"> 
                            </span>
                            {/if}

                            {#if anuncio.facebook!="" && anuncio.facebook!=null}
                            <a href="{anuncio.facebook}" class="fa-brands fa-facebook"> 
                                </a>
                            {:else}
                            <span class="fa-brands fa-facebook"> 
                            </span>
                            {/if}


                </li>
               
                
                
            </ul>

        
            <div class="card-body">    
                <p class="card-text">{anuncio.subTitulo==null?anuncio.subTitulo_preview:anuncio.subTitulo}</p>
            </div>
            <div class="card-footer text-muted text-center">
                <a class="btn btn-green btn-mini" href="/adm/anuncio/{anuncio.id}">Editar</a>
            </div>
    </div>
  </div>




