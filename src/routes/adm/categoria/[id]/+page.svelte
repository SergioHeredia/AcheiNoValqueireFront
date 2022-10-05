<script>
     

    //import UsuarioLogado  from "../login/components/usuarioLogado.svelte"
    import UsuarioLogado  from "../../login/components/usuarioLogado.svelte"
    import {page} from '$app/stores'
    import { onMount } from 'svelte';
    import { ObterPor,AdicionarImagem, Atualizar, Adicionar,getObterTodos } from "../../categoria/components/categoria-api";
    import TextInput from '../../../../components/TextInput.svelte';
    import Modal from '../../../../components/modal.svelte';
    import { customResponse,clearResponse,addResponse } from "../../../../components/customresponse";
     

    import { isUUID,isEmpty,generateUUID } from '../../../../components/validation';
    
    import SubcategoriaListComponents from '../components/subcategoriaListComponents.svelte';

    import { categorias } from "../../categoria/components/categoria-store";
   
    
    const  GeraJson = async () =>
    {
            await getObterTodos(true);

            const res = await fetch(`/api/categoriajson`, {
                method: 'POST',
                body: JSON.stringify($categorias)
            
        });
        
        
    }


    let random = generateUUID();
    
    let Id =$page.params.id;
   

    let id = "";
    let nome = "";
    let nomeImg = "";
    let criadoEm = "";
    let alteradoEm = "";
    let excluidoEm = "";
    let ativo2=true;

    $: nomeValid = !isEmpty(nome);
    let  avatar, fileinput;

    

    let fileStringBase64 = "";

    let title = "";
    let success = true;
    let isOpenModal = false;
    let messagesmodal = [];

    
    

    const  CarregaCategoria = async () =>
    {

        if (Id!="novo")
        {
            const res = await ObterPor(Id);

            id = res.id;
            nome = res.nome;
            nomeImg = res.nomeImg;
            criadoEm = res.criadoEm;
            alteradoEm = res.alteradoEm;
            excluidoEm = res.excluidoEm;
            ativo2 = excluidoEm?false:true;
        }
        else
            id="novo";
    }

    //Pega os dados antes que a página seja montada.
    onMount(async () => { await CarregaCategoria(); });




     //seleciona arquivo
     const onFileSelected =(e)=>{
                    let image = e.target.files[0];
                                let reader = new FileReader();
                                reader.readAsDataURL(image);
                                reader.onload = e => {
                                    avatar = e.target.result
                                };

                                getBase64(image).then(
                                    data => {
                                        //console.log(data);
                                        fileStringBase64 = data;
                                    }
                                );
        }


    //Converte arquivo para base64
    function getBase64(file) 
    {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    function openModal() {
        isOpenModal = true;
    }

    function closeModal() {
        isOpenModal = false;
    }


    

    async function  submit(e) {

        
        var CategoriaIn;
        if  (id=="novo")
        {
            CategoriaIn = {
            Nome : nome,
            Ativo: ativo2
            }

            const res = await Adicionar(CategoriaIn);

            

            clearResponse();
            addResponse(res);
            var result = customResponse();
            
            success = result.isValid;

            if (!success) 
            { 
                title="Ocorreu um erro";

                messagesmodal = result.errors;

                openModal();

                return;
            }
            
            Id = res.data.id;
            CarregaCategoria();
        }
        else
        {
            CategoriaIn = {
            Id : id,
            Nome : nome,
            Ativo: ativo2
            }

            const res = await Atualizar(CategoriaIn);

            clearResponse();
            addResponse(res);
            var result = customResponse();

            success = result.isValid;

            if (!success) 
            { 
                title="Ocorreu um erro";

                messagesmodal = result.errors;

                openModal();

                return;
            }
            
        }
        

        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
        const [key, value] = field;
        data[key] = value;
        }
        //console.log(data);

        if (data.FileImg.size!=0) //Fez Upload
        {
            console.log(data.FileImg.size);

            nomeImg = Id + '.' + fileStringBase64.split(',')[0].substr(11,3);

            var CategoriaImagemIn = {
                    "id": Id,
                    "ImagemNome": nomeImg,
                    "ImagemUpload": fileStringBase64.split(',')[1]


                    }

                    

            const res = await AdicionarImagem(CategoriaImagemIn);
            
            clearResponse();
            addResponse(res);
            var result = customResponse();

            
            success = result.isValid;

            if (!success) 
            { 
                title="Ocorreu um erro";

                messagesmodal = result.errors;
            
                openModal();

                return;
            }
            
            
        }
        await GeraJson();
        title="Mensagem";

        messagesmodal = ["Salvo com sucesso!"];
    
        openModal();


    }   
    

</script>

<style>
	/* #app{
	display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
} */
 
	.upload{
		display:flex;
	height:60px;
		width:60px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:60px;
		width:60px;
	}

    .subcategoria{
        background-color: white;
    }
</style>

<UsuarioLogado>

<Modal isOpenModal={isOpenModal} on:closeModal={closeModal} {title} mesages={messagesmodal} {success}/>

<div class="app-canvas">
    <div class="container">
        <div class="breadcrumb">
            <ul>
                <li><a href="/adm/">admin</a></li>
                <li>
                    <a href="/adm/categoria/">Categorias</a>
                </li>
                <li>{Id}</li>
            </ul>
        </div>

        {#if ((!isUUID(id)) && (id!="novo"))}
            {#await CarregaCategoria()}
                <p>Aguarde...</p>
            {:then}
                <div class="page row"> 
                    <div class="form-wrapper">
                        <div class="elements-block">
                            <div class="inner">
                                <h1>Categoria não encontrada.</h1>
                            </div>
                        </div>
                    </div>
                </div>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
            
        {:else}
           
            <div class="page row">
                        
                <div class="form-wrapper">
                    <form on:submit|preventDefault={submit}>
                    
                        <div class="elements-block">
                            <div class="inner">

                                <header>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-5 col-md-6">
                                            <div class="icon-heading">
                                                <h4><i class="adicon-settings tc7"></i> ADM Categoria</h4>
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
                                        <span class="label" >{id}</span>
                                </div>

                                <div class="row field-block">
                                    <div class="col-xs-12 col-md-3">
                                        <span class="label" >Ativo</span>
                                    </div>
                                    <div class="col-xs-12 col-md-9">
                                        <input class="form-check-input" type="checkbox" value="" id="ativo" bind:checked={ativo2}>
                                </div>

                                

                                <div class="row field-block">
                                    <div class="col-xs-12 col-md-3">
                                        <span class="required label" for="name">Nome</span>
                                    </div>
                                    <div class="col-xs-12 col-md-9">
                        

                                        <TextInput
                                        id="nome"
                                        valid={nomeValid}
                                        validityMessage="Preencha o campo nome."
                                        value={nome}
                                        on:input={event => (nome = event.target.value)} />

                                    </div>
                                </div>
                                

                                <div class="row field-block">
                                    <div class="col-xs-12 col-md-3">
                                        <span class="required label" >Imagem (60px|60px)</span>
                                    </div>
                                    <div class="col-xs-12 col-md-9">
                                        {#if avatar}
                                        <img class="avatar" src="{avatar}" alt="d" />
                                        {:else}
                                        <figure><img src="{nomeImg}?i={random}" class="img-fluid" alt="Categoria {nome}" /></figure> 
                                        {/if}
                                                <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
                                        <div class="chan" on:click={()=>{fileinput.click();}}>Trocar</div>
                                        <input style="display:none" type="file" id="FileImg" name="FileImg" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
                                    </div>
                                </div>

                        </div>
                        

                    </form>

                    <div class="form-wrapper">
                        <div class="elements-block">
                            <div class="inner">
                                <div class="subcategoria">
                                        <SubcategoriaListComponents  categoriaId={Id}/>
                                </div>
                            </div>
                        </div>  
                    </div> 

                </div>

                
                

            </div>

            
           
    
        {/if}
    </div>
</div>






    
           
</UsuarioLogado> 
            
    


