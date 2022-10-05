<script>
//@ts-nocheck

import {usuario} from "../components/auth-api"

import { customResponse,clearResponse,addResponse } from "../../../../components/customresponse";
import Aguarde from "../../../../components/aguarde.svelte";

let logado=false;
let success=false;
export async function  usuariologado() {
            const res = await usuario();

            var result = customResponse(res);
            clearResponse();
            addResponse(res);
            var result = customResponse();

            success = result.isValid;

        
            if (success) 
                logado=true;
}

</script>

{#await usuariologado()}
<Aguarde />
{:then}
    {#if logado}
                <slot></slot>
    {:else}
    <div class="text-center">
        <h1>Acesso Negado.</h1>
        <a class="btn btn-green btn-mini" href="/adm/login" on>login</a>
    </div>
    {/if}
{:catch error}
    <h1>{error}</h1>
{/await}


