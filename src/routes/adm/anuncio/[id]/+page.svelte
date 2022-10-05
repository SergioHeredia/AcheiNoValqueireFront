<script>
    

        
        import UsuarioLogado  from "../../login/components/usuarioLogado.svelte"
        
       
        import TextEditor from "../../../../components/textEditor.svelte";

        import { categorias } from "../../categoria/components/categoria-store";
        import { getObterTodos } from "../../categoria/components/categoria-api";
        let categoriaSelecionada

        import { subcategorias } from "../../categoria/components/subcategoria-store";
        import { getObterTodos as getObterTodosSub  } from "../../categoria/components/subcategoria-api";
        let subcategoriaSelecionada

        import { Atualizar, Adicionar, EdicaoObterPor ,AdicionarImagem,ListarImagensEdicao,MarcarImagemExcluir, Publicar} from "../components/anuncio-api";
        import { anuncioimg } from "../components/anuncioimg-store";

        import Aguarde from "../../../../components/aguarde.svelte";
        import TextInput from '../../../../components/TextInput.svelte';
        import { isEmpty,isUUID,generateUUID } from "../../../../components/validation"

        import Modal from '../../../../components/modal.svelte';
        import { customResponse,clearResponse,addResponse } from "../../../../components/customresponse";
        let title = "";
        let success = true;
        let isOpenModal = false;
        let messagesmodal = [];


        import {page} from '$app/stores'
        let Id =$page.params.id;
        

        import Tags from "svelte-tags-input";


        // If on:tags is defined
        let tags = "";

        function handleTags(event) {
            tags = event.detail.tags;

            //debugger;
        }


        const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina"
    ];






        let ativo=true;
        let titulo="";
        $: tituloValid = !isEmpty(titulo);
        let subtitulo="";
        $: subtituloValid = !isEmpty(subtitulo);
        let descricao="";
        let descricao2="";
        $: descricaoValid = !isEmpty(descricao);
        let telefone1EhWhatsapp=false;
        let telefone2EhWhatsapp=false;
        let enderecoFisico="";
        let telefone1 = "";
        let telefone2 = "";
        let email="";
        let site="";
        let facebook="";
        let instagram="";
        let twitter="";
        let tiktok="";
        let youtube="";
        let obs="";
        let expiraEm;
        let publicadoEm;
        let destaqueAte;
        let temPreview=false;

        let expiraEmmonth, expiraEmday, expiraEmyear;
        let expiraEmdateString="";

        let publicadoEmmonth, publicadoEmday, publicadoEmyear;
        let publicadoEmdateString="";

        let destaqueAtemonth, destaqueAteday, destaqueAteyear;
        let destaqueAtedateString="";


        const  CarregaAnuncio = async () =>
        {

          
                 const res = await EdicaoObterPor(Id);
           



                if (res=="")
                {
                    Id="novo";
                }
                else
                {

                    temPreview= res.temPreview;
                    
                    let excluidoEm = res.excluidoEm;
                    ativo = excluidoEm?false:true;
                    titulo = res.titulo;
                    subtitulo = res.subTitulo;
                    descricao = res.descricao;

                    telefone1=res.telefone1;
                    if (telefone1==null)
                        telefone1EhWhatsapp =false;
                    else
                        telefone1EhWhatsapp = res.telefone1EhWhatsapp;

                    telefone2=res.telefone2;
                    if (telefone1==null)
                        telefone2EhWhatsapp =false;
                    else
                        telefone2EhWhatsapp = res.telefone2EhWhatsapp;

                    enderecoFisico=res.enderecoFisico;
                    email=res.email;
                    site=res.site;
                    facebook=res.facebook;
                    instagram=res.instagram;
                    twitter=res.twitter;
                    tiktok=res.tiktok;
                    youtube=res.youtube;
                    tags = res.tags.split(",");
                    obs = res.obs;

                    if (res.publicadoEm!=null)
                    {
                        
                        publicadoEm = new Date(res.publicadoEm);

                        publicadoEmmonth = '' + (publicadoEm.getMonth() + 1),
                        publicadoEmday = '' + publicadoEm.getDate(),
                        publicadoEmyear = publicadoEm.getFullYear();

                        if (publicadoEmmonth.length < 2) 
                            publicadoEmmonth = '0' + publicadoEmmonth;
                        if (publicadoEmday.length < 2) 
                            publicadoEmday = '0' + publicadoEmday;

                        publicadoEmdateString = [publicadoEmday,publicadoEmmonth,publicadoEmyear].join('/');


                        if (res.expiraEm!=null)
                        {
                            expiraEm = new Date(res.expiraEm);

                            expiraEmmonth = '' + (expiraEm.getMonth() + 1),
                            expiraEmday = '' + expiraEm.getDate(),
                            expiraEmyear = expiraEm.getFullYear();

                            if (expiraEmmonth.length < 2) 
                                expiraEmmonth = '0' + expiraEmmonth;
                            if (expiraEmday.length < 2) 
                                expiraEmday = '0' + expiraEmday;

                            expiraEmdateString = [expiraEmyear, expiraEmmonth, expiraEmday].join('-');
                        }

                        if (res.destaqueAte!=null)
                        {
                            destaqueAte = new Date(res.destaqueAte)
                            destaqueAtemonth = '' + (destaqueAte.getMonth() + 1),
                            destaqueAteday = '' + destaqueAte.getDate(),
                            destaqueAteyear = destaqueAte.getFullYear();

                            if (destaqueAtemonth.length < 2) 
                                destaqueAtemonth = '0' + destaqueAtemonth;
                            if (destaqueAteday.length < 2) 
                                destaqueAteday = '0' + destaqueAteday;

                            destaqueAtedateString = [destaqueAteyear, destaqueAtemonth, destaqueAteday].join('-');

                            
                        }
                        
                        
                    }


                    categoriaSelecionada =  res.categoriaId;

                    await getObterTodosSub(categoriaSelecionada);

                    
                    if (res.subCategoriaId!=null)
                        subcategoriaSelecionada = res.subCategoriaId;
                    else
                        subcategoriaSelecionada="";

                }


        }






    //controle caracteres campo

    $: l_subtitulo=240-subtitulo.length

    $: if(subtitulo.length>240)
        {
            subtitulo = subtitulo.substring(0, 240)
        }



        function handlecategoria() {

            getObterTodosSub(categoriaSelecionada);
            document.getElementById("SubCategoriaId").value="";
        }


        async function  submit(e)
        {

            var categoriaSelecionada_=null;
            if (categoriaSelecionada!="")
                categoriaSelecionada_ = categoriaSelecionada;


            var subcategoriaSelecionada_=null;
            if (subcategoriaSelecionada!="")
                subcategoriaSelecionada_ = subcategoriaSelecionada;

            var telefone1_=null;
            if (telefone1!="")
                telefone1_ = telefone1;
            else
                telefone1EhWhatsapp=false;

            var telefone2_=null;
            if (telefone2!="")
                telefone2_ = telefone2;
            else
                telefone2EhWhatsapp=false;

            descricao2 = document.getElementById("Descricao").getElementsByClassName("ql-editor")[0].innerHTML;

            var AnuncioIn;
            if  (Id=="novo")
            {

                AnuncioIn = {
                CategoriaId_preview: categoriaSelecionada_,
                SubCategoriaId_preview: subcategoriaSelecionada_,
                Titulo_preview: titulo,
                SubTitulo_preview: subtitulo,
                Descricao_preview: descricao2,
                EnderecoFisico_preview: enderecoFisico,
                Telefone1_preview: telefone1_,
                Telefone1EhWhatsapp_preview: telefone1EhWhatsapp,
                Telefone2_preview:telefone2_,
                Telefone2EhWhatsapp_preview: telefone2EhWhatsapp,
                Email_preview: email,
                Site_preview: site,
                Facebook_preview: facebook,
                Instagram_preview: instagram,
                Twitter_preview: twitter,
                Tiktok_preview: tiktok,
                Youtube_preview: youtube,
                Tags_preview: tags.toString(),
                Obs : obs
                }


                const res = await Adicionar(AnuncioIn);


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


            }
            else
            {
                let _expiraEmdateString;
                if (expiraEmdateString!="")
                    _expiraEmdateString=expiraEmdateString;

                let _destaqueAtedateString;
                if (destaqueAtedateString!="")
                    _destaqueAtedateString=destaqueAtedateString;



                AnuncioIn = {
                Id:Id,
                CategoriaId_preview: categoriaSelecionada_,
                SubCategoriaId_preview: subcategoriaSelecionada_,
                Titulo_preview: titulo,
                SubTitulo_preview: subtitulo,
                Descricao_preview: descricao2,
                EnderecoFisico_preview: enderecoFisico,
                Telefone1_preview: telefone1_,
                Telefone1EhWhatsapp_preview: telefone1EhWhatsapp,
                Telefone2_preview:telefone2_,
                Telefone2EhWhatsapp_preview: telefone2EhWhatsapp,
                Email_preview: email,
                Site_preview: site,
                Facebook_preview: facebook,
                Instagram_preview: instagram,
                Twitter_preview: twitter,
                Tiktok_preview: tiktok,
                Youtube_preview: youtube,
                Tags_preview: tags.toString(),
                Ativo:ativo,
                Obs:obs,
                ExpiraEm: _expiraEmdateString,
                DestaqueAte: _destaqueAtedateString
                }


                const res = await Atualizar(AnuncioIn);


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




            temPreview=true;

            title="Mensagem";

            messagesmodal = ["Salvo com sucesso!"];

            openModal();

            
        }


    function openModal() {
        isOpenModal = true;
    }

    function closeModal() {
        isOpenModal = false;
    }


    const ExcluirImagem = async (imgid) =>
        {
                         

                var AnuncioImagemIn = {
                        "id": imgid
                        }



                const res = await MarcarImagemExcluir(AnuncioImagemIn);

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


                title="Mensagem";

                messagesmodal = ["Excluido com sucesso!"];

                openModal();
                //debugger;


                avatar="";
                ListarImagensEdicao(Id);


            //}


        }

        
        const PublicarAnuncio = async () =>
        {
                         

                var AnuncioImagemIn = {
                        "id": Id
                        }



                const res = await Publicar(AnuncioImagemIn);

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


                title="Mensagem";

                messagesmodal = ["Publicado com sucesso!"];

                openModal();
                //debugger;
                temPreview=false;
                //CarregaAnuncio();
                avatar="";
                ListarImagensEdicao(Id);

                


            //}


        }


        const SalvarImagem = async () =>
        {
            //debugger;
            //if (data.FileImg.size!=0) //Fez Upload
            //{
            //    console.log(data.FileImg.size);

                var randomId = generateUUID();

                var ext = extensao.split('/')[1];
                if (ext=="jpeg") ext = "jpg";

                var nomeImg = randomId + '.' + ext;

                var AnuncioImagemIn = {
                        "id": randomId,
                        "AnuncioId":Id,
                        "Img": nomeImg,
                        "ImagemUpload": fileStringBase64.split(',')[1]
                        }



                const res = await AdicionarImagem(AnuncioImagemIn);

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


                title="Mensagem";

                messagesmodal = ["Salvo com sucesso!"];

                openModal();
                //debugger;


                avatar="";
                ListarImagensEdicao(Id);


            //}


        }

        let   fileinput,avatar;
        let fileStringBase64 = "";
        let extensao = "";
        //seleciona arquivo
        const onFileSelected =(e)=>{
                    let image = e.target.files[0];
                                let reader = new FileReader();
                                reader.readAsDataURL(image);
                                reader.onload = e => {
                                    avatar = e.target.result
                                };
                                extensao = image.type;
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


    // function handleClick(e) {
	// 	console.log(e.detail.src);
    //     console.log(e);
	// }



    </script>


    <style>
            .elements-block
            {
                    min-height: 100px;
            }

            :global(img) { opacity: .9; transition: all .2s }
	        :global(img):hover { opacity: 1; transform: scale(1.04) }

            .avatar{
                    max-width: 400px;

                    border: 1px solid black;
                    background-position: center;
                    background-size: cover;
            }

            div.gallery {
            margin: 5px;
            border: 0px solid #ccc;
            float: left;
            width: 260px;
            }

            div.gallery:hover {
            border: 1px solid #777;
            }

            div.gallery img {
            width: 100%;
            height: auto;
            }

            div.desc {
            padding: 15px;
            text-align: center;
            }



    </style>

<UsuarioLogado>

    <Modal isOpenModal={isOpenModal} on:closeModal={closeModal} {title} mesages={messagesmodal} {success}/>
    
    <div class="app-canvas">
                <div class="container">
                    <div class="breadcrumb">
                        <ul>
                            <li><a href="/adm/">Admin</a></li>
                            <li>
                                <a href="/adm/anuncio/">Anuncio</a>
                            </li>
                            <li>{Id}</li>
                        </ul>
                    </div>

                    <div class="page row">
                        <header class="heading style-bg big text-center">
                            <h1>O <strong>Maior</strong> Classificado do Bairro</h1>
                            <p class="text-uppercase">Vender e compar qualquer coisa</p>
                        </header>
                        <div class="form-wrapper">



                                <form on:submit|preventDefault={submit}>


                                    <div class="elements-block">

                                        <div class="inner">
                                            {#if ((isUUID(Id)) && (Id!="novo") && (temPreview))}
                                            <button class="btn btn-green btn-mini" on:click|preventDefault={PublicarAnuncio}>Publicar Alteração</button>
                                            <a class="btn btn-green btn-mini" target="_blank" href="/incrivel/{titulo.toLowerCase().replaceAll(' ', '-')}/{Id}/?p=1">Visualizar Alteração</a>
                                        {/if}
                                            <div class="elements-block pull-right">

                                                <button class="btn btn-green btn-mini" >Salvar</button>

                                            </div>

                                        <h4>Dados Anúncio</h4>

                                        <div class="row field-block">
                                            <div class="col-xs-12 col-md-3">
                                                <span class="label" >Id</span>
                                            </div>
                                            <div class="col-xs-12 col-md-9">
                                                <span class="label">{Id}</span>
                                        </div>

                                        <div class="row field-block">
                                            <div class="col-xs-12 col-md-3">
                                                <span class="label" >Ativo</span>
                                            </div>
                                            <div class="col-xs-12 col-md-9">
                                                <input class="" type="checkbox" value="" id="ativo" bind:checked={ativo}>
                                        </div>
                                        
                                        {#if publicadoEmdateString!=""}
                                        <div class="row field-block">
                                            <div class="col-xs-12 col-md-3">
                                                <span class="label" >Publicado Em</span>
                                            </div>
                                            <div class="col-xs-12 col-md-9">
                                                <span class="label">{publicadoEmdateString}</span>
                                                
                                            </div>
                                        </div>

                                        <div class="row field-block">
                                            <div class="col-xs-12 col-md-3">
                                                <span class="required label" >Expira Em</span>
                                            </div>
                                            <div class="col-xs-12 col-md-9">

                                                <input type="date" id="ExpiraEm" bind:value="{expiraEmdateString}">
                                            </div>
                                        </div>

                                        <div class="row field-block">
                                            <div class="col-xs-12 col-md-3">
                                                <span class="label" >Destaque Até</span>
                                            </div>
                                            <div class="col-xs-12 col-md-9">

                                                <input type="date" id="DestaqueAte" bind:value="{destaqueAtedateString}">
                                            </div>
                                        </div>
                                        {/if}

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="required label" >Categoria</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">

                                                    <select id="CategoriaId" bind:value={categoriaSelecionada}  on:change="{handlecategoria}" class="input-sm">
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

                                                </div>
                                            </div>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label" >SubCategoria</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">


                                                    <select bind:value={subcategoriaSelecionada} id="SubCategoriaId" class="input-sm" >
                                                        <option value="">
                                                            Nenhum
                                                        </option>

                                                        {#each $subcategorias as subcategoria}
                                                            <option value={subcategoria.id}>
                                                                {subcategoria.nome}
                                                            </option>
                                                        {/each}

                                                        </select>



                                                </div>
                                            </div>




                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="required label" >Título</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">

                                                    <TextInput
                                                        id="Titulo"
                                                        valid={tituloValid}
                                                        validityMessage="Preencha o campo Título."
                                                        value={titulo}
                                                        on:input={event => (titulo = event.target.value)}
                                                        placeholder="Ex. Spa das Divas"/>
                                                </div>
                                            </div>

                                        <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="required label" >SubTítulo</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">

                                                    <TextInput
                                                    id="SubTitulo"
                                                    valid={subtituloValid}
                                                    validityMessage="Preencha o campo SubTítulo."
                                                    bind:value={subtitulo}
                                                    on:input={event => (subtitulo = event.target.value)}
                                                    controlType="textarea"
                                                    placeholder="Especialidade em loiros. Salão com mais de 30 anos de experiência no mercado."/>
                                                    <p>{l_subtitulo} chars.</p>
                                                </div>
                                            </div>

                                            <div class="row field-block" style="margin-bottom: 100px;">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="required label" >Descrição</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9 ">
                                                   
                                                    {#if descricao}
                                                    <TextEditor id="Descricao" texto="{descricao}"/>
                                                    {/if}
                                                    
                                                        
                                                    
                                                </div>
                                                
                                            </div>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label" >Endereço Físico</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input type="text" id="EnderecoFisico" bind:value="{enderecoFisico}" placeholder="ex. R. das Rosas, 227 - Sl 202 - Vila Valqueire, Rio de Janeiro - RJ, 21330-680">
                                                </div>
                                            </div>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label" >Telefone 1</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <div class="icon-field">
                                                        <span>+55</span>
                                                        <input class="input-sm" type="tel" id="Telefone1" placeholder="ex. 21 98722-2222" bind:value={telefone1}>
                                                    </div>
                                                    <input  type="checkbox" value="" id="Telefone1EhWhatsapp" bind:checked={telefone1EhWhatsapp}> <span class="fa-brands fa-whatsapp" style="position: relative;top: -15px;"></span>
                                                </div>


                                            </div>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label" >Telefone 2</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <div class="icon-field">
                                                        <span>+55</span>
                                                        <input class="input-sm" type="tel" id="Telefone2" bind:value={telefone2} placeholder="ex. 219872-22222">
                                                    </div>
                                                    <input  type="checkbox" value="" id="Telefone2EhWhatsapp" bind:checked={telefone2EhWhatsapp} > <span class="fa-brands fa-whatsapp" style="position: relative;top: -15px;"></span>
                                                </div>
                                            </div>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label" >Email</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input class="input-sm" type="email" id="Email" bind:value="{email}" placeholder="ex. jon@got.com">
                                                </div>
                                            </div>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="fa-solid fa-earth-americas"></span><span class="label" >- Site</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input type="text" id="Site" bind:value="{site}" placeholder="">
                                                </div>
                                            </div>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="fa-brands fa-facebook"></span><span class="label" >- Facebook</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input type="text" id="Facebook" bind:value="{facebook}" placeholder="">
                                                </div>
                                            </div>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="fa-brands fa-square-instagram"></span><span class="label" >- Instagram</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input type="text" id="Instagram" bind:value="{instagram}" placeholder="">
                                                </div>
                                            </div>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="fa-brands fa-twitter"></span><span class="label" >- twitter</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input type="text" id="twitter" bind:value="{twitter}" placeholder="">
                                                </div>
                                            </div>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                                                                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                                                                        </svg>- Tiktok</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <input type="text" id="Tiktok" bind:value="{tiktok}" placeholder="">
                                                </div>
                                            </div>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label" >Observação interna</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <TextInput
                                                    id="Obs"
                                                    bind:value={obs}
                                                    controlType="textarea"
                                                    placeholder="Observações, lembretes, anotações e etc. Essas informação não serão exibidas."/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="elements-block style-gray">
                                        <div class="inner">
                                            <h4>Apresentação em Vídeo</h4>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="fa-brands fa-youtube"></span><span class="label fa fa-youtube-play">- Youtube</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">https://www.youtube.com/watch?v=xxxxxxxxxx
                                                    <input type="text" id="Youtube" bind:value="{youtube}" placeholder="Digite o código do vídeo representado acima com a letra xxxxxxxx.">


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {#if ((isUUID(Id)) && (Id!="novo"))}
                                    <div class="elements-block">
                                        <div class="inner">
                                            <h4>Imagens (melhor > largura: 1125px / altura:720px) </h4>

                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3" on:click|preventDefault={()=>{fileinput.click();}}>
                                                    <span class="fa-solid fa-download" ></span><span class="label">Selecione suas imagens</span>

                                                </div>


                                                <input style="display:none" type="file" id="FileImg" name="FileImg" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >

                                                </div>


                                                {#if avatar}
                                                <div class="row field-block">
                                                    <div class="col-xs-12 col-md-3">
                                                        <img class="avatar" src="{avatar}" alt="d" />
                                                    </div>
                                                </div>
                                                <div class="row field-block">
                                                    <div class="col-xs-12 col-md-3">
                                                        <button class="btn btn-green btn-mini" on:click|preventDefault={SalvarImagem}>Salvar Imagem</button>
                                                    </div>
                                                </div>
                                                {/if}

                                                <div class="row field-block">





                                                     

                                                        {#await ListarImagensEdicao(Id)}
                                                        <Aguarde />
                                                        {:then}

                                                            {#if $anuncioimg.length}
                                                                {#each  $anuncioimg as imganuncio}

                                                                
                                                                <div class="gallery">
                                                                     <a target="_blank" href="{imganuncio.img}"> 
                                                                      <img src="{imganuncio.img}" alt="Cinque Terre">
                                                                     </a> 
                                                                    <div class="desc">
                                                                        <button class="btn btn-blue btn-mini" on:click|preventDefault={ExcluirImagem(imganuncio.id)}>Excluir Imagem</button>
                                                                    </div>
                                                                  </div>


                                                                {/each}

                                                            {:else}
                                                                    <p>Sem Imagem</p>
                                                            {/if}
                                                        {:catch error}
                                                            <p style="color: red">{error.message}</p>
                                                        {/await}

                                                       

                                            </div>
                                        </div>
                                    </div>
                                    {/if}
                                    <div class="elements-block style-gray">
                                        <div class="inner">
                                            <h4>SEO</h4>
                                            <div class="row field-block">
                                                <div class="col-xs-12 col-md-3">
                                                    <span class="label fa fa-hashtag">- Tags</span>
                                                </div>
                                                <div class="col-xs-12 col-md-9">
                                                    <Tags
                                                    tags={tags}
                                                        on:tags={handleTags}
                                                        addKeys={[9]}
                                                        maxTags={10}
                                                        allowPaste={true}
                                                        allowDrop={true}
                                                        splitWith={"/"}
                                                        onlyUnique={false}
                                                        removeKeys={[27]}
                                                        placeholder={"Use tecla 'tab' para separar"}
                                                        autoComplete={countryList}
                                                        name={"Tags"}
                                                        id={"Tags"}
                                                        allowBlur={true}
                                                        disable={false}
                                                        minChars={1}
                                                            onlyAutocomplete={false}

                                                    />
                                                    <span>
                                                        Tags: {tags}
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="elements-block pull-right">
                                       
                                        <button class="btn btn-green btn-mini" >Salvar</button>

                                    </div>

                                </form>

                        </div>

                    </div>

                </div>
                {#if ((isUUID(Id)) && (Id!="novo"))}
                {#await CarregaAnuncio()}
                    <p>Aguarde...</p>


                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}


                {/if}
            </div>

           
        </UsuarioLogado>