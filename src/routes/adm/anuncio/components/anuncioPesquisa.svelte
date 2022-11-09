<script>
    // @ts-nocheck

    import Aguarde from "../../../../components/aguarde.svelte";

    import { categorias } from "../../categoria/components/categoria-store";
    import { getObterTodos } from "../../categoria/components/categoria-api";
    let categoriaSelecionada

    import { ObterTodosCompleto } from "../../anuncio/components/anuncio-api";
    let txtPesquisa="";
    import { anuncios,store } from "../components/anuncio-store";

    let ativo = true;
    let destaque = false;
    let Producao = true;

    function handleAtivo() {
        ativo = !ativo;

    }
    function handleProducao() {
        Producao = !Producao;

    }
    function handleDestaque() {
        destaque = !destaque;
        
    }

    const  handlePesquisar = async () =>
        {

            
            await ObterTodosCompleto(1000,1,txtPesquisa,categoriaSelecionada, ativo,destaque,false,Producao);

            
        }

        handlePesquisar();
</script>

<style></style>



<div class="container">
    <div class="elements-block">
        
            <div class="listing-actions  clearfix" data-target="#items-listing-area">
                        
                        
                        <div class="inner">
                            <div class="button-action w-100">
                                <span>Ativo</span>
                                <a href="#" on:click|preventDefault="{handleAtivo}" class="active" ><i  class="fa"></i></a>
                            </div>

                            <div class="button-action w-100">
                                <span>Produção</span>
                                <a href="#" on:click|preventDefault="{handleProducao}" class="active" ><i  class="fa"></i></a>
                            </div>
                            
                           
                            <div class="button-action w-100">
                                <span>Destaque</span>
                                <a href="#"  on:click|preventDefault="{handleDestaque}" class=""><i class="fa fa-star-o"></i>
                                    
                                </a>
                            </div>
                        </div>
                                        
                                        <select id="CategoriaId" bind:value={categoriaSelecionada}  class="" >
                                            {#await getObterTodos(true)}
                                            <Aguarde />
                                            {:then}
                                                {#if $categorias.length}
                                                <option value="">
                                                    Selecione
                                                </option>
                                                
                                                {#each $categorias as categoria}
                                                    <option value={categoria.id}>
                                                        {categoria.nome}
                                                    </option>
                                                {/each}
    
                                                {/if}
                                            {:catch error}
                                                <p style="color: red">{error.message}</p>
                                            {/await}
    
                                        </select>
                                        
                                            <input type="text" Id="txtPresquisa" bind:value="{txtPesquisa}" placeholder="Pesquisar"  />
                                            
                                            <button class="btn btn-green" on:click|preventDefault="{handlePesquisar}">Pesquisar</button>
                                            <a href="/adm/anuncio/novo" class="btn btn-green" >Novo Anúncio</a>
                                         

                            
                        
                        
            
            </div>
    </div>
</div>


