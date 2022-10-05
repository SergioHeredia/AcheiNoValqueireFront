

<script>
    // @ts-nocheck



    import AnuncioCard from "./anuncioCard.svelte";

    import { store} from "../../anuncio/components/anuncio-store";

    

</script>

<style>

.items-list {
    margin-left: 0px;
}
</style>


        {#if $store.anuncios.list!=null}
            {#if $store.anuncios.list.length>0}
                {#each $store.anuncios.list as anuncio}
                    <AnuncioCard {anuncio} />
                {/each}
            {/if}
        {/if}
        