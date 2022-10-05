// @ts-nocheck
let itens =[];

let  results = [
    {
    isValid : true,
    errors: []
    }
];

function add(item) {
    itens = [...itens , item];
}

export function clearResponse()
{
    results.isValid = true;
    results.errors= [];
   
    itens =[];
}

export function customResponse()
{
    results.errors = itens;
    return results;
}

export function addResponse(res) {

    //debugger;
    if (res.data!=null) //200
    {
        if (res.data.isValid==false)
            {
                results.isValid=false;

                
                res.data.errors.forEach(function(item, i) {
                    add(item.errorMessage);
                })
                    
            }
                
            
    }


    if (res.response!=null)
    {
        
        switch (res.response.status) {
        case 400:
            results.isValid=false;
            if (res.response.data.success==false)
            {
                res.response.data.errors.forEach(function(item,index){
                    if (item.errorMessage!=null)
                        add(item.errorMessage);
                    else
                        add(item);
                });
            }
            else{
                add("(400) - Algum erro ocorreu!");
            }
            break;
        case 401:
            results.isValid=false;
            add("(401) - Não Autorizado! O cliente deve se autenticar para obter a resposta solicitada.");
            break;
        case 403:
            results.isValid=false;
            add("(403) - Acesso Priobido! O cliente não tem direitos de acesso ao conteúdo");
            break;
        case 500:
            results.isValid=false;
            add("(500) - Erro Interno! ");
            break;
        default:
            results.isValid=false;
            add("(" + res.response.status + ") - Algum erro ocorreu!");
        }
    }

  }