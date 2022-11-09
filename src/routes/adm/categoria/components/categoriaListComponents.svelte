
<script>
    // @ts-nocheck

    import { categorias } from "../components/categoria-store";

    import Aguarde from "../../../../components/aguarde.svelte";

    import { getObterTodos } from "../components/categoria-api";

    import CategoriaCard from "../components/categoriaCardComponents.svelte"; 

    
</script>



<header>
    <div class="row">
        <div class="col-xs-12 col-sm-5 col-md-6">
            <div class="icon-heading">
                <h4><i class="adicon-settings tc7"></i> ADM Categorias</h4>
            </div>
        </div>
        <div class="col-xs-12 col-sm-7 col-md-6">
            <div class="search-widget pull-right">
                <a class="btn btn-green btn-mini" href="/adm/categoria/novo">nova categoria</a>
            </div>
        </div>
    </div>
</header>
<div class="inner">
    <div class="items-list-md style2 pad-top-0">
        <div class="items-list">
            {#await getObterTodos()}
            <Aguarde />
            {:then}
                {#if $categorias.length}
                
                    {#each  $categorias as categoria}
            
                            
                            <CategoriaCard CategoriaDomain={categoria}/>
                        
                    {/each}

                {:else}
                        <p>Sem categorias</p>
                {/if}
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
           

        </div>
    </div>
    
</div>