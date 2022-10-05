
// @ts-nocheck   

import * as fs from 'fs';



export const post = async({ request }) => {
   

    const res = await request.json();

    try {

        fs.writeFile("./src/infra/data/categorias.json", JSON.stringify(res), function(err, result) {
            if(err) console.log('error', err);
          });
    }catch(error)
    {
        console.log(error);
    }

   
}