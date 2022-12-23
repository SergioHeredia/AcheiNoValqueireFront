<script>
// @ts-nocheck
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    
    import { onMount } from 'svelte';
    import Aguarde from "../components/aguarde.svelte";
    import {ObterPor} from "../components/categoria-api"
    import {ObterPor as ObterSubPor} from "../components/subcategoria-api"
    import {ImagemProducao} from "../components/anuncio-api"
    import SvelteSeo from "svelte-seo";

    import { Slidy } from "svelte-slidy";

    const slidy = {
        slides: [],
        wrap: {
            id: "slidy",
            width: "100%",
            height: "100%",
            padding: "1",
            align: "middle",
            alignmargin: 10,
        },
        slide: {
            gap: 10,
            class: "",
            width: "255px",
            height: "100%",
            backimg: true,
            imgsrckey: "src",
            objectfit: "cover",
            overflow: "hidden",
        },
        controls: {
            dots: false,
            dotsnum: false,
            dotsarrow: false,
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

    export let id;
    export let titulo;
    export let subTitulo;
    export let categoriaId;
    export let subCategoriaId;
    
    let subCategoria="";
    export let site;
    export let instagram;
    export let facebook;
    //export let tags;


    let nomeCategoria;
    let nomeImgCategoria;
    let nomeSubCategoria;

    


    let slides;

    onMount(async () => {

        const res = await ObterPor(categoriaId);
            nomeCategoria = res.nome;
            nomeImgCategoria = res.nomeImg;


        let res2;
        if (subCategoriaId!=null)
        {
            res2 = await ObterSubPor(subCategoriaId);
                nomeSubCategoria = res2.nome;
        }



        const imgs = await ImagemProducao(id);
        if (imgs.length!=0)
        {

            slides = imgs.map(function(row) {
                return { id : row.id, 
                    img: row.img
                }
                })
        }

        
    })

            

    function openModal(item) {
        
	

        dispatch('message', {
			text: item
		});
	}	
    let index = 0;

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

    let canonical = import.meta.env.VITE_baseURL + "incrivel/" + titulo.toLowerCase().replaceAll(' ', '-') + "/" + id;
	
</script>



<style>
    a {
        text-decoration: none;
    }
       .card:hover{
            background: #fff;
            box-shadow: 0px 0px 10px 0px rgba(6, 6, 6, 0.12);
            transform: scale(1.02);
            

       }

       .card{
            border-width: 1px 1px 1px 1px;
            border-radius: 5px;
            transition: all ease-out 0.1s;
       }

       

</style>
  
  

        <div class="card h-100" style="max-height: 530px; min-width: 250px;">

            <div class="card-header">
                <h5 class="card-title btn">{titulo}</h5>
            </div>

            <div style="height: 200px;">
            {#await Promise}
                <Aguarde />
            {:then}
                {#if slides==null}
                    <img class="card-img-top" src="/assets/img/items/list-item-1.png" alt="Sem imagem" style="max-height: 200px;">
                {:else}
                    <Slidy bind:index {...slidy} {slides}  let:item> 
                        <div style="cursor: pointer"
                            
                            on:dragstart|preventDefault
                            on:mousemove|preventDefault
                            on:mouseup|preventDefault
                            on:click={openModal(item.img)}>
                                    <img class="card-img-top" src="{item.img}" alt="{item.img}" width="20px" height="20px" style="max-height: 200px;" >
                    </div>
                    </Slidy>
                    
                {/if}
            {:catch error}
                    <p style="color: red">{error.message}</p>
            {/await}

        </div>
            

            <ul class="list-group list-group-flush">
                <li class="list-group-item fw-light">
                    <em><small>
                            {#await Promise}
                                <Aguarde />
                            {:then}
                            
                                    <img src="{nomeImgCategoria}" alt="{nomeCategoria}" style="max-width: 20px; max-height: 20px;"/>
                                
                               {nomeCategoria}
                            {:catch error}
                                <p style="color: red">{error.message}</p>
                            {/await}
                            {#if (nomeSubCategoria!=null)}
                            {'>>'} 
                                {nomeSubCategoria}
                            {/if}
                        </small></em>
                    
                </li>
                
            </ul>

            <div class="card-body">    
                <em>
                <p class="card-text lh-1">{subTitulo} 
                </em>
            </div>
            


            
            <div class="card-footer text-muted">
                <div class="row  align-items-center">
                    <div class="col-6">
                        <a class="btn btn-green btn-mini" href="/incrivel/{titulo.toLowerCase().replaceAll(' ', '-')}/{id}">mais</a>
                    </div>
                    <div class="col-6 text-end">
                    {#if site!="" && site!=null}
                    <a href="{site}" target="_blank" class="fa-solid fa-earth-americas fa-2x"> 
                        </a>
                    {:else}
                    <span class="fa-solid fa-earth-americas fa-2x"> 
                    </span>
                    {/if}

                    {#if instagram!="" && instagram!=null}
                    <a href="{instagram}" target="_blank" class="fa-brands fa-square-instagram fa-2x ">
                    </a>
                    {:else}
                    <span class="fa-brands fa-square-instagram fa-2x "> 
                    </span>
                    {/if}

                    {#if facebook!="" && facebook!=null}
                    <a href="{facebook}" target="_blank" class="fa-brands fa-facebook fa-2x  tooltip-parent"> 
                        </a>
                    {:else} 
                    <span class="fa-brands fa-facebook fa-2x tooltip-parent"> 
                    </span>
                    {/if}
                    </div>
                </div>
            </div>
        </div>
   
<!-- 
        <SvelteSeo
                    title="{titulo}"
                    description="{subTitulo}"
                    canonical =  "{canonical}"
                    keywords={tags}
                    
                    
                    /> -->



    