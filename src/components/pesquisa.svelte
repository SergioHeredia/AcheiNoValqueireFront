<script>

// @ts-nocheck

import { getObterTodos } from "../routes/adm/categoria/components/categoria-api";
import { onMount } from 'svelte';
import Aguarde from "../components/aguarde.svelte";

//import data from '../infra/data/categorias.json';

export let categoriaSelecionada="";
export let oque="";


	let data=""
	onMount(async () => { 
		data = await getObterTodos(true);
		
		
	});

  const onKeyPress = e => {
    if (e.charCode === 13) pesquisar();
  };

function pesquisar()
{
  

   
    var param="?a=1"

    if (oque!="") param += "&oque=" + oque;

    if (categoriaSelecionada!="")
      param +="&nacategoria=" + categoriaSelecionada;
   
      
    
      window.open("/encontre"+param,"_self");
  
  

  
  
}


</script>
<style>
input[type=text] {
  max-width: none;
}
</style>



<form method="post">
    <div class="row ">
      <div class="col-md-4 col-sm-12">
                          <select bind:value={categoriaSelecionada} style="width: 100%; ">
                            <option selected value="">Todos</option>

                            {#await Promise}
                                <Aguarde />
                                {:then}
                          
                                {#if (data.length!=0)}

                                    {#each data as  categoria}
                                        <option value="{categoria.id}">{categoria.nome}</option>
                                     {/each}
                                  
                                {:else}
                                    <p>Sem categorias</p>
                                {/if}
                          {:catch error}
                            <p style="color: red">{error.message}</p>
                          {/await}

    

                             
                              
                              
                          </select>
        </div>
        <div class="col-md-7 col-sm-10">
                          <input type="text" Id="txtPresquisa" bind:value="{oque}" placeholder="Pesquisar" style="width: 100%;" on:keypress={onKeyPress}/>
        </div>   
        <div class="col-md-1 col-sm-2">          
                          <span class ="btn btn-green fa-solid fa-magnifying-glass" on:click|preventDefault="{pesquisar}"></span> 
          </div>  
    </div>
</form>