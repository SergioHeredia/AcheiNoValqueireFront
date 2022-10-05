

<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    

    import {generateUUID } from '../../../../components/validation';

    let random = generateUUID();
    
let id;
    let nome;
    let criadoEm;
    let alteradoEm;
    let excluidoEm;

    export let SubCategoriaDomain = {
        id,
        nome,
        criadoEm,
        alteradoEm,
        excluidoEm,
    };

    function edit(id,nome,ativo) {
        
        dispatch('message', {
			id: id,
            nome:nome,
            ativo:ativo
		});
    }

   
    
</script>

<style>

   

    .itemsubcategoria
    {
        height: 80px ;
        margin-top: 10px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>



 <div class="itemsubcategoria row text-center" >
    
    <div class="col-sm-4 {SubCategoriaDomain.excluidoEm? 'text-decoration-line-through':''}">
        <h6>{SubCategoriaDomain.id}</h6>
    </div>

    <div class="col-sm-7 {SubCategoriaDomain.excluidoEm? 'text-decoration-line-through':''}">
        <h6>{SubCategoriaDomain.nome}</h6>
    </div>
    <div class="col-sm-1">
        <button class="btn btn-blue btn-mini" on:click="{edit(SubCategoriaDomain.id,SubCategoriaDomain.nome,SubCategoriaDomain.excluidoEm? false:true)}" >Editar</button>
        
    </div>
    <hr />
</div>