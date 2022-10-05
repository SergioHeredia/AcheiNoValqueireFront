<script>
    // @ts-nocheck
        export let id;
        export let texto;

        let editor;
    
        $:texto2 = texto;
    
        
        // para editor
        let md;
    
    
    
            var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
    
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
    
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
    
            ['clean']                                         // remove formatting button
            ];
    
            import { onMount } from 'svelte';
    

            
            var quill;
            onMount(async () => {
            
                        quill = new Quill(editor, {
                                                theme: 'snow',
                                                modules: {
                                            toolbar: toolbarOptions
                                            }
                            });
                            
                           
    
    
            });
        // para editor
    
    </script>
    
    <style>
      
      @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
      
    
    </style>
   
        <div id={id} bind:this={editor} >{@html texto}</div>
        