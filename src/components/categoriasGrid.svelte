
<script>
// @ts-nocheck
    
    import { getObterTodos } from "../routes/adm/categoria/components/categoria-api";
	import { onMount } from 'svelte';
	import Aguarde from "../components/aguarde.svelte";

	import SvelteSeo from "svelte-seo";
	
	
	let slides="";
	let data=""
	onMount(async () => { 
		data = await getObterTodos(true);
		
		if (data.length!=0)
		{
			
			slides = data.map(function(row) {
			return { id : row.id, src : row.nomeImg,figcaption:row.nome }
			})
		}
	});
	


    import { Slidy } from "svelte-slidy";
    
		

    const slidy = {
		timeout: 0,
		slides: [],
		wrap: {
			id: 'slidy',
			width: '100%',
			height: '150px',
			padding: '2',
			align: 'middle',
			alignmargin: 0,
		},
		slide: {
			gap: 10,
			width: '150px',
			height: '150px',
			backimg: false,
			imgsrckey: 'src',
			objectfit: 'cover',
			overflow: 'hidden'
		},
		controls: {
			dots: false,
			dotsnum: false,
			dotsarrow: true,
			dotspure: true,
			arrows: false,
			keys: true,
			drag: true,
			wheel: true,
		},
		options: {
			axis: 'x',
			loop: true,
			duration: 350,
		}
	}
    
    let index = 0;



	function pesquisar(id)
	{
	
		window.open("/encontre?nacategoria="+id,"_self");
	
	}
</script>



<style>
	a{
		text-decoration-line: none;
	}
    
</style>
<div  style="background-color: #f4f4f4 ;">
    <header class="heading style2 text-center">
        <h1><strong>Categorias</strong></h1>
        
    </header>

	<div class="container">
		<div class="row">
		 <div class="col-2 d-flex align-items-center  justify-content-end">
			
				 <div class="owl-prev slick-arrow" style="" on:click={() => index -= 1}><i class="fa-solid fa-circle-arrow-left fa-3x "></i></div>
			 
		 </div>
		 <div class="col-8">

		
    

			{#await Promise}
            <Aguarde />
            {:then}
			
				{#if (data.length!=0)}

				
					{#each slides as categoria }
						<SvelteSeo
						openGraph={{
							title: categoria.figcaption,
							description: 'Categoria ' +  categoria.figcaption,
							url: import.meta.env.VITE_baseURL + 'encontre?nacategoria=' + categoria.id.toString(),
							type: 'website',
							images: [
							{
								url: categoria.src,
								width: 60,
								height: 60,
								alt: categoria.figcaption
							}
							]
						}}
						/>
					{/each}




					<Slidy bind:index {...slidy} {slides} let:item>

               
			
				
				<div on:click|preventDefault="{pesquisar(item.id)}" style="cursor: pointer;">
					<div class="card text-center justify-content-center">
						<div class="card-header justify-content-center">
							<img src="{item.src}" class="mx-auto d-block" alt="{item.figcaption}" width="60px" height="60px" style="width: 60px; height: 60px;">
						</div>
						<div class="card-body">
									
									<p class="card-text">{item.figcaption}</p>
									
									
						</div>
						
					</div>
				</div>
				
			   
			</Slidy>
			{:else}
					<p>Sem categorias</p>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}


				
			</div>
		<div class="col-2 d-flex align-self-center">
			<div class="owl-next slick-arrow" style="" on:click={() => index += 1}><i class="fa-solid fa-circle-arrow-right fa-3x "></i></div>
		</div>
		</div>
	</div>




 
  
 
</div>