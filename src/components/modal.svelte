<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();


    
    
    export let success=true;
    export let isOpenModal=false;
    export let title = "";
    export let mesages = [
        ""
    ];
    
    
    function closeModal() 
    {
        isOpenModal = false;
        dispatch('closeModal', { isOpenModal });
    }
</script>



   <style>
    #background {
    display: var(--display);
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    }
   
    #modal {
    display: var(--display);
    position: fixed;
    z-index: 9999999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    filter: drop-shadow(0 0 20px #333);
    width: 90%;  
    height: auto;
    max-height: 57em;
    max-width:66em;
    }

    .panel-body{
        overflow-y: scroll;
        max-height: 17em;
        max-width:66em;
        width: 100%;  
        height: 100%;

    }

   </style>

   
   <div id="background" style="--display: {isOpenModal ? 'block' : 'none'};" on:click={closeModal}></div>
   <div id="modal" style="--display: {isOpenModal ? 'block' : 'none'};">
       
    
    <div  class="bs-example">
        <div class="panel panel-{success ? 'success' : 'danger'}">
            
            <div class="panel-heading"><h3 class="panel-title">{title}</h3></div>
            <div class="panel-body">
                <ul>
                    {#each mesages as item}
                    <li>
                            {item}
                    </li>
                    {/each}
                
            </ul>
        </div>
            
          

        </div>
    </div>


   </div>
   