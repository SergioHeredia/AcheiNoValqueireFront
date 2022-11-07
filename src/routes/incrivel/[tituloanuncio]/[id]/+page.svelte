<script>
        // @ts-nocheck
        import SvelteSeo from "svelte-seo";

        import {page} from '$app/stores'
        let Id =$page.params.id;
        let TituloParam = $page.params.tituloanuncio;

        let preview =$page.url.searchParams.get("p");

        import {ObterPor as ObterCatPor } from "../../../../components/categoria-api"
        import {ObterPor as ObterSubPor} from "../../../../components/subcategoria-api"
       
        import { scale, fade } from 'svelte/transition';
        import {ImagemProducao,ObterPor} from "../../../../components/anuncio-api"
        //import { onMount } from 'svelte';
        import Aguarde from "../../../../components/aguarde.svelte";

        import { EdicaoObterPor,ListarImagensEdicao} from "../../../adm/anuncio/components/anuncio-api"

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
                width: "90%",
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

        
         export let titulo;
         let subTitulo;
         let descricao;
         let categoriaId;
         let subCategoriaId;
         let youtube="";
         let instagram;
         let facebook;
         let site;
         let twitter;
         let tiktok;
         let telefone1;
         let telefone1EhWhatsapp;
         let telefone2;
         let telefone2EhWhatsapp;
         let endereco;
         let tags;
       

         let nomeCategoria;
        let nomeImgCategoria;
        let nomeSubCategoria;

        let slides,slides2;

        let existeanuncio = true;
        
        
        async function  CarregaAnuncio() {
                let anuncio="";
                if (preview!=1)
                        anuncio = await ObterPor(Id);
                else
                        anuncio = await EdicaoObterPor(Id);

               
                if (anuncio=="")
                {
                        existeanuncio=false;
                        return;
                }

                titulo = anuncio.titulo;
                subTitulo = anuncio.subTitulo;
                descricao = anuncio.descricao;
                categoriaId = anuncio.categoriaId;
                subCategoriaId = anuncio.subCategoriaId;
                youtube = anuncio.youtube;
                instagram = anuncio.instagram;
                facebook = anuncio.facebook;
                site=anuncio.site;
                twitter = anuncio.twitter;
                tiktok = anuncio.tiktok;
                telefone1 = anuncio.telefone1;
                telefone1EhWhatsapp = anuncio.telefone1EhWhatsapp;
                telefone2 = anuncio.telefone2;
                telefone2EhWhatsapp = anuncio.telefone2EhWhatsapp;
                endereco = anuncio.enderecoFisico;
                tags = anuncio.tags;
                

                const res = await ObterCatPor(categoriaId);
                nomeCategoria = res.nome;
                nomeImgCategoria = res.nomeImg;


                const res2 = await ObterSubPor(subCategoriaId);
                nomeSubCategoria = res2.nome;

                let imgs;

                
                        imgs = await ImagemProducao(Id);
                

                if (imgs.length!=0)
                {

                slides = imgs.map(function(row) {
                        return { id : row.id, 
                        img: row.img
                        }
                        })

                slides2 = imgs.map(function(row) {
                        return { alt : titulo, 
                                url: row.img
                        }
                        })

                }
                };

        let img = {},
        isModal = false;
        let index = 0;


        function openModal(item) {
        
                img = item;
                isModal = true;
                play=false;
        }	
        function closeModal() {


                img = {};
                isModal = !isModal;
                play=true;;
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
         @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

        a {
                text-decoration: none;
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









{#await CarregaAnuncio()}
    <Aguarde />
    {:then}
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

    
    {#if existeanuncio}
    
    <SvelteSeo
    title="{titulo}"
    description="{subTitulo}"
    canonical = "{$page.url}"
    keywords={tags}
    
    
    openGraph={{
        title: titulo,
        description: subTitulo,
        url: $page.url,
        type: 'website',
        images: slides2
      }}
    />
                <div class="app-canvas">
                        <div class="container ">

                                <div class="breadcrumb">
                                        <ul>
                                        <li><a href="#top" onclick="history.back()">Voltar</a></li>
                                        <li>
                                                <a href="/incrivel/{TituloParam}/{Id}">{titulo}</a>
                                        </li>
                                        
                                        </ul>
                                </div>
                                
                                
                                <div class="row  ">
                                        <div class="col-md-8 " >
                                        <div class="row" style="background-color: white;margin-bottom: 10px;">
                                                <div class="col-12">

                                                        <h5 class="fa mt-5">{titulo}</h5>
                                                </div>
                                                <div class="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
                                                        
                                                        <button type="button" class="btn btn-outline-secondary"><i class="fas fa-share-alt"></i> Compartilhar</button>
                                                </div>
                                                <div Class="col-12">
                                                        {#await Promise}
                                                        <Aguarde />
                                                        {:then}
                                                                {#if slides==null}
                                                                <img class="card-img-top" src="/assets/img/items/list-item-1.png" alt="Sem imagem" >
                                                                {:else}
                                                                <Slidy bind:index {...slidy} {slides}  let:item > 
                                                                        <div style="cursor: pointer"
                                                                                on:dragstart|preventDefault
                                                                                on:mousemove|preventDefault
                                                                                on:mouseup|preventDefault
                                                                                on:click={openModal(item.img)}
                                                                                >
                                                                                        <img class="card-img-top" src="{item.img}" alt="{item.img}" style="max-height: 475px;">
                                                                        </div>
                                                                </Slidy>
                                                                
                                                                {/if}
                                                        {:catch error}
                                                                <p style="color: red">{error.message}</p>
                                                        {/await}
                                                </div>
                                        </div>    



                                        <div class="row" style="background-color: white;margin-bottom: 10px; ">
                                                <div class="col-12" style="padding-bottom: 10px;">
                                                        <p class="fw-bold" style="margin-top: 10px;">
                                                        
                                                                {#await Promise}
                                                                <Aguarde />
                                                                {:then}
                                                                
                                                                
                                                                        <img src="{nomeImgCategoria}" alt="{nomeCategoria}" style="max-width: 50px; max-height: 50px;"/>
                                                                                {nomeCategoria}
                                                                
                                                                {:catch error}
                                                                <p style="color: red">{error.message}</p>
                                                                {/await}
                                                                {#if (nomeSubCategoria!=null)}
                                                                {'>>'} 
                                                                {nomeSubCategoria}
                                                                {/if}
                                                        
                                                        </p>
                                                </div>
                                                <div class="col-12">
                                                        <p class="lh-base fw-semibold fst-italic">{subTitulo}</p>
                                                </div>
                                        
                                                <div class="col-12">
                                                        <h5><strong>Descrição:</strong></h5>
                                                        
                                                                <div id="Descricao" class="">
                                                                        <div class="ql-editor" data-gramm="false" contenteditable="false">
                                                                
                                                                                {@html descricao}
                                                                        </div>
                                                                </div>
                                                        
                                                </div>
                                        </div>

                                        {#await Promise}
                                                <Aguarde />
                                        {:then}
                                                {#if youtube!=""}
                                                        <div class="row p-3"  style="background-color: white;margin-bottom: 10px;">
                                                                <div class="col-12">
                                                                        <iframe 
                                                                                width="100%" 
                                                                                height="405px" 
                                                                                src="https://www.youtube.com/embed/{youtube}" 
                                                                                title="YouTube video player" 
                                                                                frameborder="0" 
                                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                                                allowfullscreen>
                                                                        </iframe>
                                                                </div>
                                                        </div>
                                                {/if}
                                        {:catch error}
                                                <p style="color: red">{error.message}</p>
                                        {/await}

                                        </div>
                                        <div class="col-md-4">
                                                <div class="row m-1" style="background-color: white;margin-bottom: 10px;">
                                                        <div class="col-12">
                                                                <h5><strong>Achei Em:</strong></h5>
                                                        </div>
                                                        <div class="col-12 text-center">
                                                                
                                                                {#if site!="" && site!=null}
                                                                <a href="{site}" class="fa-solid fa-earth-americas fa-2x"> 
                                                                        </a>
                                                                {:else}
                                                                <span class="fa-solid fa-earth-americas fa-2x"> 
                                                                </span>
                                                                {/if}

                                                                {#if instagram!="" && instagram!=null}
                                                                <a href="{instagram}" class="fa-brands fa-square-instagram fa-2x ">
                                                                </a>
                                                                {:else}
                                                                <span class="fa-brands fa-square-instagram fa-2x "> 
                                                                </span>
                                                                {/if}

                                                                {#if facebook!="" && facebook!=null}
                                                                <a href="{facebook}" class="fa-brands fa-facebook fa-2x  tooltip-parent"> 
                                                                        </a>
                                                                {:else} 
                                                                <span class="fa-brands fa-facebook fa-2x tooltip-parent"> 
                                                                </span>
                                                                {/if}
                                                                {#if twitter!="" && twitter!=null}
                                                                <a href="{twitter}" class="fa-brands fa-twitter fa-2x  tooltip-parent"> 
                                                                        </a>
                                                                {:else} 
                                                                <span class="fa-brands fa-twitter fa-2x totwitteroltip-parent"> 
                                                                </span>
                                                                {/if}
                                                                {#if tiktok!="" && tiktok!=null}
                                                                <a href="{tiktok}" class="fa-brands fa-tiktok fa-2x  tooltip-parent"> 
                                                                        </a>
                                                                {:else} 
                                                                <span class="fa-brands fa-tiktok fa-2x tooltip-parent"> 
                                                                </span>
                                                                {/if}
                                                                
                                                        </div>
                                                        <p></p>
                                                        <p></p>
                                                        {#if telefone1!="" && telefone1!=null}
                                                                <div class="col-12">
                                                                        <h5><strong>Telefones:</strong></h5>
                                                                        
                                                                        <ul>
                                                                                {#if telefone1EhWhatsapp!="" && telefone1EhWhatsapp!=null}
                                                                                <p> 
                                                                                                <em>
                                                                                                        <li class="fa-brands fa-whatsapp fa-2x"> </li>
                                                                                                                {telefone1}
                                                                                                </em>
                                                                                        </p>
                                                                                        
                                                                                {:else}
                                                                                        <p> 
                                                                                                <em>
                                                                                                <li class="fa fa-phone-alt fa-2x"> </li>
                                                                                                        {telefone1}
                                                                                                </em>
                                                                                        </p>
                                                                                        
                                                                                {/if}
                                                                                {#if telefone2!="" && telefone2!=null}
                                                                                        {#if telefone2EhWhatsapp!="" && telefone2EhWhatsapp!=null}
                                                                                        <p> 
                                                                                                <em>
                                                                                                        <li class="fa-brands fa-whatsapp fa-2x"> </li>
                                                                                                                {telefone2}
                                                                                                        </em>
                                                                                                </p>
                                                                                        
                                                                                        {:else}
                                                                                                <p> 
                                                                                                        <em>
                                                                                                        <li class="fa fa-phone-alt fa-2x"> </li>
                                                                                                                {telefone2}
                                                                                                        </em>
                                                                                                </p>
                                                                                        {/if}
                                                                                {/if}
                                                                        </ul>
                                                                        
                                                                </div>
                                                        {/if}
                                                        <p></p>
                                                        <p></p>
                                                        {#if endereco!="" && endereco!=null}
                                                        <div class="col-12">
                                                                <h5><strong>Endereço:</strong></h5>
                                                                <p> 
                                                                        <em>
                                                                                <ul>
                                                                                <li class="fa fa-location-dot fa-2x"> </li>
                                                                                        {endereco}
                                                                                </ul>
                                                                        </em>
                                                                        <iframe 
                                                                        width="100%" 
                                                                        height="380" 
                                                                        id="gmap_canvas" 
                                                                        src="https://maps.google.com/maps?q={endereco}}&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                                                                        frameborder="0" 
                                                                        scrolling="no"
                                                                        marginheight="0" 
                                                                        marginwidth="0"
                                                                        title="">
                                                                        </iframe>
                                                                        <style></style>
                                                                </p>
                                                        </div>
                                                        {/if}

                                                </div>
                                        </div>
                                </div>
                                
                        </div>

                </div>
        {:else}
        <div class="app-canvas">
                <div class="container ">

                        <div class="breadcrumb">
                                <ul>
                                <li><a href="#top" onclick="history.back()">Voltar</a></li>
                                </ul>
                        </div>
                        <h1>Anúncio não existe!</h1>
                </div>
        </div>
        {/if}
    {:catch error}
    <p style="color: red">{error.message}</p>
{/await}
