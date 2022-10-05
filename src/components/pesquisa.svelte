<script>

// @ts-nocheck


import data from '../infra/data/categorias.json';

export let categoriaSelecionada="";
export let oque="";

import { goto } from '$app/navigation';

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
                            {#each data as  categoria}
                                
                                <option value="{categoria.id}">{categoria.nome}</option>
                            {/each}

                             
                              
                              
                          </select>
        </div>
        <div class="col-md-7 col-sm-10">
                          <input type="text" Id="txtPresquisa" bind:value="{oque}" placeholder="Pesquisar" style="width: 100%; " />
        </div>   
        <div class="col-md-1 col-sm-2">          
                          <span class ="btn btn-green fa-solid fa-magnifying-glass" on:click|preventDefault="{pesquisar}"></span> 
          </div>  
    </div>
</form>