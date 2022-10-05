

  <script>
 
    
	
    import CategoriasGrid from "../components/categoriasGrid.svelte";

    import Destaque from "../components/destaque.svelte";

    import SvelteSeo from "svelte-seo";

    import PesquisaLogo from "../components/pesquisaLogo.svelte";
    import { page } from '$app/stores';
   

</script>


<SvelteSeo
title="Achei no Valqueire"
description="Melhor site de anuncios"
canonical = "{$page.url}"
/>
    




<section>
  <div style="height: 450px;background: url('/assets/img/basic/fundobanner.png') center / cover;">
      <section class="position-relative py-4 py-xl-5 ">
          <div class="container position-relative ">
              <div class="row d-flex justify-content-center ">
                  <div class="col-md-12 col-lg-10 col-xl-8 col-xxl-6 ">
                      <div class="card mb-12 " style="border-radius: 4px;opacity: 0.9;">
                          <PesquisaLogo />
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </div>
  <div class="container h-100 position-relative" style="top: -100px; opacity: 0.9; ">
      <div class="row ">
          <div class="col">
              <div class="card" style="border-radius: 4px;">
                  <div class="card-body pt-5 p-4">

          <CategoriasGrid />
        </div>
              </div>
          </div>
         
      </div>
  </div>
</section>

    <Destaque />
    





                  
                