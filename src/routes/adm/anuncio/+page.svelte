<script>
    // @ts-nocheck
    
    import UsuarioLogado  from "../login/components/usuarioLogado.svelte"
    import AnuncioPesquisa from "../anuncio/components/anuncioPesquisa.svelte";
    import AnuncioList from "../anuncio/components/AnuncioList.svelte";

    
    

    

   

</script>

<style>
    

</style>



<div class="app-canvas">

    <div class="container">
        <UsuarioLogado>

        <div class="breadcrumb">
            <ul>
                <li><a href="/adm/">Admin</a></li>
                <li>
                    <a href="/adm/anuncio/">Anuncio</a>
                </li>
                
            </ul>
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-5 col-md-6">
                <div class="icon-heading">
                    <h4><i class="adicon-settings tc7"></i> ADM Anúncio</h4>
                </div>
            </div>
            
        </div>
    


        <AnuncioPesquisa/>


        <div class="row row-cols-1 row-cols-md-3 g-4">
        

            <AnuncioList></AnuncioList>
        </div>
        </UsuarioLogado>

    </div>
    <p></p>

</div>