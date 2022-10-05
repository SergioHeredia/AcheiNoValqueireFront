<script>
// @ts-nocheck

import Pesquisa from "../../components/pesquisa.svelte";


import {page} from '$app/stores'
let oque =$page.url.searchParams.get("oque");
let nacategoria = $page.url.searchParams.get("nacategoria"); 

if (oque==null) oque="";
if (nacategoria==null) nacategoria="";

let NextPageIndex = $page.url.searchParams.get("NextPageIndex"); 
let PreviousPageIndex = $page.url.searchParams.get("PreviousPageIndex"); 
let PageIndex = $page.url.searchParams.get("PageIndex"); 

if (PageIndex==null || PageIndex==0) PageIndex=1;

if (NextPageIndex!=null) PageIndex = NextPageIndex;

if (PreviousPageIndex!=null) PageIndex = PreviousPageIndex;

import Aguarde from "../../components/aguarde.svelte";
import { ObterTodos } from "../../components/anuncio-api";


import AnuncioList from "../../components/anuncioList.svelte";


</script>


<div class="app-canvas">
    <div class="container p-2">

            <div class="breadcrumb">
                    <ul>
                        <li><a href="#" onclick="history.back()">Voltar</a></li>
                        
                        
                    </ul>
            </div>

            <div class="row justify-content-center pb-2"  style="background-color:white ;">
                <div class="col-md-9 mt-5 ">
                    <Pesquisa {oque} categoriaSelecionada={nacategoria}/>
                </div>
            </div>


            <div class="row mt-2" >
                
                <div class="col-12" style="background-color:white ;" >
                    <div class="row ">
                        
                        {#await ObterTodos(8,PageIndex,oque,nacategoria,false,false)}
                            <Aguarde />
                        {:then}
                        <AnuncioList {nacategoria} {oque}/>
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                    </div>
                    
                    
                </div>
            
            </div>
            
    </div>

    
</div>