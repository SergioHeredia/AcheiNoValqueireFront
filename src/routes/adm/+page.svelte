

<script>

import UsuarioLogado  from "./login/components/usuarioLogado.svelte"


</script>

<div class="app-canvas">
    <div class="container">
        <UsuarioLogado>


        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
            <div class="card border-primary">
                
                <div class="card-body">
                    <a href="/adm/categoria"  ><h5 class="card-title">CATEGORIA</h5></a>
                
                </div>
            </div>
            </div>
            <div class="col">
            <div class="card  border-secondary">
               
                <div class="card-body">
                    <a href="/adm/anuncio"  ><h5 class="card-title">ANUNCIO</h5></a>
                
                </div>
            </div>
            </div>
        
        </div>

    </UsuarioLogado>
    </div>
    <p></p>
</div>

