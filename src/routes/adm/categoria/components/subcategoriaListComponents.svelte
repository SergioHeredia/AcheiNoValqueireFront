<script>
    // @ts-nocheck

    import { subcategorias } from "../components/subcategoria-store";

    import Aguarde from "../../../../components/aguarde.svelte";

    import { getObterTodos, Adicionar,Atualizar } from "../components/subcategoria-api";

    import SubCategoriaCard from "./subcategoriaCardComponents.svelte"

    import TextInput from '../../../../components/TextInput.svelte';

    import { isUUID,isEmpty,generateUUID } from '../../../../components/validation';

    import Modal from '../../../../components/modal.svelte';
    import { customResponse,clearResponse,addResponse } from "../../../../components/customresponse";


    export let categoriaId="";


    getObterTodos(categoriaId);


    let title = "";
    let success = true;
    let isOpenModal = false;
    let messagesmodal = [];

    let id2 = "novo";
    let nome2 = "";
    let criadoEm2 = "";
    let alteradoEm2 = "";
    let excluidoEm2 = "";
    let ativo22=true;

   
    

    $: nome2Valid = !isEmpty(nome2);

    async function  submit2(e) {
        var SubCategoriaIn;
        if  (id2=="novo")
        {
            SubCategoriaIn = {
            Nome : nome2,
            CategoriaId:categoriaId,
            Ativo: ativo22
            }

            const res = await Adicionar(SubCategoriaIn);

            

            clearResponse();
            addResponse(res);
            var result = customResponse();
            
            success = result.isValid;

            if (!success) 
            { 
                debugger;
                title="Ocorreu um erro";

                messagesmodal = result.errors;

                openModal();

                return;
            }
            title="Mensagem";

            messagesmodal = ["Salvo com sucesso!"];
    
            openModal();
            
            
        }
        else
        {
            debugger;
            SubCategoriaIn = {
            Id : id2,
            Nome : nome2,
            CategoriaId:categoriaId,
            Ativo: ativo22
            }

            const res = await Atualizar(SubCategoriaIn);

            

            clearResponse();
            addResponse(res);
            var result = customResponse();
            
            success = result.isValid;

            if (!success) 
            { 
                debugger;
                title="Ocorreu um erro";

                messagesmodal = result.errors;

                openModal();

                return;
            }
            title="Mensagem";

            messagesmodal = ["Salvo com sucesso!"];
    
            openModal();
        }
        getObterTodos(categoriaId)
    }

    function openModal() {
        isOpenModal = true;
    }

    function closeModal() {
        isOpenModal = false;
    }

    function edit(event) {
        
        id2=event.detail.id;
        nome2 = event.detail.nome;
        ativo22= event.detail.ativo;
        document.getElementById("nome2").focus();

        
    }
    
</script>

<Modal isOpenModal={isOpenModal} on:closeModal={closeModal} {title} mesages={messagesmodal} {success}/>

<div class="form-wrapper">
    <form on:submit|preventDefault={submit2}>
    
        <header>
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-6">
                    <div class="icon-heading">
                        <h4><i class="adicon-settings tc7"></i> ADM SubCategorias</h4>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-6">
                    <div class="search-widget pull-right">
                        <button class="btn btn-green btn-mini" >Salvar</button>
                    </div>
                </div>
            </div>
        </header>
             
            
            
                <div class="row field-block">
                    <div class="col-xs-12 col-md-3">
                        <span class="label" >Id</span>
                    </div>
                    <div class="col-xs-12 col-md-9">
                        <span class="label" >{id2}</span>
                </div>

                 <div class="row field-block">
                    <div class="col-xs-12 col-md-3">
                        <span class="label" >Ativo</span>
                    </div>
                    <div class="col-xs-12 col-md-9">
                        <input class="form-check-input" type="checkbox" value="" id="ativo" bind:checked={ativo22}>
                </div> 
                

                <div class="row field-block">
                    <div class="col-xs-12 col-md-3">
                        <span class="required label" for="name">Nome</span>
                    </div>
                    <div class="col-xs-12 col-md-9">
        
                        
                         <TextInput
                            bind:value={nome2}
                            id="nome2"
                            valid={nome2Valid}
                            validityMessage="Preencha o campo nome."
                            on:input={event => (nome2 = event.target.value)}
                           
                         /> 

        </div>
        

    </form>

</div>


<div class="inner">
    <div class="items-list-md style2 pad-top-0">
        <div class="items-list">
            {#await getObterTodos(categoriaId)}
            <Aguarde />
            {:then}
                {#if $subcategorias.length}
                    {#each  $subcategorias as subcategoria}
            
                            
                            <SubCategoriaCard SubCategoriaDomain={subcategoria} on:message={edit}/>
                        
                    {/each}

                {:else}
                        <p>Sem Subcategorias</p>
                {/if}
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
           

        </div>
    </div>
    
</div>


