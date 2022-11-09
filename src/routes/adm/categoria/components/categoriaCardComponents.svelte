

<script>
    import {generateUUID } from '../../../../components/validation';
    import {ObterTotalPor} from "../../anuncio/components/anuncio-api"
    import { onMount } from 'svelte';
    import Aguarde from "../../../../components/aguarde.svelte";
    let random = generateUUID();
    
    let id;
    let nome;
    let nomeImg;
    let criadoEm;
    let alteradoEm;
    let excluidoEm;

    export let CategoriaDomain = {
        id,
        nome,
        nomeImg,
        criadoEm,
        alteradoEm,
        excluidoEm,
    };
    

    let totalAtivos=0;
    let totalDesativados=0;


    async function  CarregaTotais() {

        totalAtivos=0;
        totalDesativados=0;

        totalAtivos =  await ObterTotalPor(CategoriaDomain.id,true);

        totalDesativados =  await ObterTotalPor(CategoriaDomain.id,false);

        
    };
</script>

<style>

   

    .itemcategoria
    {
        height: 80px ;
        margin-top: 10px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>



 <div class="itemcategoria row text-center" >
    <div class="col-sm-4 text-center"> 
       
            <img src="{CategoriaDomain.nomeImg}?i={random}" alt="{CategoriaDomain.nome}">
            
    </div>



    <div class="col-sm-3 {CategoriaDomain.excluidoEm? 'text-decoration-line-through':''}">
        <h6>{CategoriaDomain.nome}</h6>
        
    </div>
    <div class="col-sm-1">
    {#await CarregaTotais()}
            <Aguarde />
        {:then}
            <span title="Publicado" class="badge bg-primary">{totalAtivos.data}</span> / <span title="Não Publicado" class="badge bg-secondary">{totalDesativados.data}</span>
        {/await}
    </div>
    <div class="col-sm-4">
        <a sveltekit:prefetch class="btn btn-blue btn-mini" href="/adm/categoria/{CategoriaDomain.id}">editar</a>
        
    </div>
</div>