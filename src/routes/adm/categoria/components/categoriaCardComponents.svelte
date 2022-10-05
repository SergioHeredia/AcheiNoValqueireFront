

<script>
    import {generateUUID } from '../../../../components/validation';

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



    <div class="col-sm-4 {CategoriaDomain.excluidoEm? 'text-decoration-line-through':''}">
        <h6>{CategoriaDomain.nome}</h6>
    </div>
    <div class="col-sm-4">
        <a sveltekit:prefetch class="btn btn-blue btn-mini" href="/adm/categoria/{CategoriaDomain.id}">editar</a>
        
    </div>
</div>