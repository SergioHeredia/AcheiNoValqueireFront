<script>
// @ts-nocheck
import { scale, fade } from 'svelte/transition';
import { onMount } from 'svelte';
import Aguarde from "../components/aguarde.svelte";
import { ObterTodosDestaque as ObterTodos } from "../components/anuncio-api";



let slides=""

let index = 0;
onMount(async () => { 



    let anuncios = await ObterTodos(5,1,null,null,true,true);

    if (anuncios.length!=0)
    {
        slides = anuncios.list.map(function(row) {
            return { id : row.id, 
                titulo: row.titulo,
                subTitulo: row.subTitulo,
                categoriaId: row.categoriaId,
                subCategoriaId: row.subCategoriaId,
                site: row.site,
                facebook: row.facebook,
                instagram: row.instagram
            }
            })
        }

        

});




import { Slidy } from "svelte-slidy";
import AnuncioCard from '../components/anuncioCard.svelte';





const slidy = {
        slides: [],
        wrap: {
            id: "",
            width: "82%",
            height: "585px",
            padding: "1",
            align: "middle",
            alignmargin: 10,
        },
        slide: {
            gap: 10,
            class: "",
            width: "300px",
            height: "100%",
            backimg: true,
            imgsrckey: "src",
            objectfit: "cover",
            overflow: "hidden",
        },
        controls: {
            dots: true,
            dotsnum: true,
            dotsarrow: true,
            dotspure: false,
            arrows: true,
            keys: true,
            drag: true,
            wheel: true,
        },
        options: {
            axis: "x",
            loop: true,
            duration: 550,
        },
    };


            let img = {},
			isModal = false;

           

    function openModal(event) {
        
		img = event.detail.text
		isModal = true;
        play=false;
	}	
	function closeModal() {

        
		img = {}
		isModal = !isModal
	}


    let play = true;
	$: play ? slidyPlay() : clearInterval(timerPlay)
	let playduration = 4000
	let timerPlay
	function slidyPlay() {
		if (timerPlay !== null) {
			clearInterval(timerPlay)
		}
		timerPlay = setInterval(() => index++, playduration)
	}

    
</script>

<style>
	

.container{
    padding-bottom: 20px;
}

#modal {

		background: rgba(0,0,0,0.27);
		align-items: center;
		justify-content: center;
        display: var(--display);
        position: fixed;
        z-index: 9999999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: drop-shadow(0 0 20px #333);
        width: 100%;  
        height: 100%;
    
	}
	#modal img {
        max-width: 100%; 
        max-height: 100%; 
        object-fit: cover;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5px;
       
        display: block;

        }
</style>

{#if img && isModal}
<div 
         id="modal" 
         on:click={closeModal} 
         transition:fade
    >
        <img 
             alt="{img}" 
             src="{img}" 
             transition:scale
        />
</div>
{/if}

<div class="">
    <div class="container">

    {#await Promise}
    <Aguarde />
    {:then}
        <header class="heading style2 text-center">
            <h1><strong>Em Destaque</strong></h1>
            
        </header>

        {#if slides.length>3}
        
        <Slidy bind:index {...slidy} {slides} let:item>

            <AnuncioCard 
            id={item.id}
            titulo={item.titulo}
            subTitulo={item.subTitulo}
            categoriaId={item.categoriaId}
            subCategoriaId={item.subCategoriaId}
            site={item.site}
            facebook={item.facebook}
            instagram={item.instagram}
            on:message={openModal}></AnuncioCard>

        </Slidy> 
    
        {:else}
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center gap-2" >
            {#each slides as anuncio }
            
                    <div class="col">
                    <AnuncioCard 
                    id={anuncio.id}
                    titulo={anuncio.titulo}
                    subTitulo={anuncio.subTitulo}
                    categoriaId={anuncio.categoriaId}
                    subCategoriaId={anuncio.subCategoriaId}
                    site={anuncio.site}
                    facebook={anuncio.facebook}
                    instagram={anuncio.instagram}
                    on:message={openModal}></AnuncioCard>
            
                </div>

            {/each}
        </div>

        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}


    </div>
</div>