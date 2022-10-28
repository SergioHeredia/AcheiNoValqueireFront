<script>
// @ts-nocheck

    export let controlType = null;
    export let id;
    export let label= "";
    export let rows = null;
    export let value;
    export let type = "text";
    export let valid = true;
    export let validityMessage = "";
    export let placeholder="";
    export let maxlength="";

    
  
    let touched = false;


  </script>
  
 
  
  
    {#if label!=""}
        <label for={id}>{label}</label>
    {/if}
    {#if controlType === 'textarea'}
      <textarea class:invalid="{!valid && touched}" {rows} {id} bind:value on:blur={() => touched = true} {placeholder}/>
    {:else}
      <input class:invalid="{!valid && touched}" type="text" {id} bind:value={value} on:input on:blur={() => touched = true} {placeholder} {maxlength}/>
    {/if}
    {#if validityMessage && !valid && touched}
      <p class="error-message">{validityMessage}</p>
    {/if}
 
   