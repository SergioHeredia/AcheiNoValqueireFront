




const anuncios =  async () => {
  try {
    let res = await fetch(import.meta.env.VITE_baseURLAPI +"v1/anuncio?pageSize=500&pageIndex=1&destaque=false&aleatorio=true");

    const item = await { posts: await res.json() };
 
    return { item };
  } 
  catch (err) {
    console.log(err);
  }
};


export async function GET() {

    let ListUrl ="";

   //console.log(import.meta.env.VITE_baseURLAPI);
    const res= await anuncios();
    
    res.item.posts.list.forEach(element => {
                
                ListUrl+='<url> ' + 
                '<loc>' + import.meta.env.VITE_baseURL +'incrivel/' + element.titulo.toLowerCase().replaceAll(' ', '-') + '/' + element.id + '</loc> ' + 
                '<lastmod>' + element.publicadoEm +'</lastmod> ' + 
              '</url>'

              
      });
        
      
      

    return await new Response(
      '<?xml version="1.0" encoding="UTF-8" ?>' +
      '<urlset ' +
      '  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" ' +
      '  xmlns:xhtml="https://www.w3.org/1999/xhtml" ' +
      '  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" ' +
      '  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" ' +
      '  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" ' +
      '  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1" ' +
      '> ' + ListUrl + 
      '</urlset>'.trim(),
      {
        headers: {
          'Content-Type': 'application/xml'
        }
      }
    );
  }