<script>
//@ts-nocheck



import {login} from "../login/components/auth-api"


import Modal from '../../../components/modal.svelte';
import { customResponse,clearResponse,addResponse } from "../../../components/customresponse";

let email="";
let password="";

let title = "";
let success = true;
let isOpenModal = false;
let messagesmodal = [];

function openModal() {
        isOpenModal = true;
    }

    function closeModal() {
        isOpenModal = false;
    }

async function  submit(e) {


    var acesso ={
       
            "Email": email,
            "Password": password

    }


    const res = await login(acesso);

    clearResponse();
    addResponse(res);
    var result = customResponse();

    //console.log(res)
    //console.log(result)
    
    success = result.isValid;

    if (!success) 
    { 
        localStorage.clear();
        title="Ocorreu um erro";

        messagesmodal = result.errors;

        openModal();

        return;
    }
    
	

    localStorage.setItem('jwt', res.data.accessToken);
    localStorage.setItem('user', res.data.userToken.email);

    window.open("/adm","_self");
			
}
</script>



<Modal isOpenModal={isOpenModal} on:closeModal={closeModal} {title} mesages={messagesmodal} {success}/>



  <div class="container text-center p-5">
    <div class="row justify-content-start">
      
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-8">
        <div class="account-access-option">
            <header class="text-left mb-50">
                <h4>login</h4>
                <p>Entre com suas credenciais </p>
            </header>
            <form id="signInForm" on:submit|preventDefault={submit}>
                <div class="field-block">
                    <div class="labeled-input">
                        <label for="si_username">Username</label>
                        <input id="si_username" title="Entre com username" minlength="3" name="si_username" type="text" bind:value={email}>
                    </div>
                </div>
                <div class="field-block">
                    <div class="labeled-input">
                        <label for="si_password">Password</label>
                        <input id="si_password" title="Entre com Password" name="si_password" type="password" bind:value={password}>
                    </div>
                </div>

                <button class="btn btn-md btn-green block-element">Login</button>

            </form>
        </div>
    
      </div>
      
    </div>
    
  </div>
  </div>

    
  
  