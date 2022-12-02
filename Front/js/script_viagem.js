//MODAL
const openModalButton = document.querySelectorAll(".open-modal");
const closeModalButton = document.querySelectorAll(".close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

fade.addEventListener("click", () => toggleModal());

closeModalButton.forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

openModalButton.forEach((el)=> {
    el.addEventListener("click", () => toggleModal())
})

const info_corrida = document.getElementById('info_corrida');
const pagamento_final = document.getElementById('pagamento_final');
const corrida = document.getElementById('corrida');

document.querySelector('#btn_pagamento').addEventListener('click', ()=> {
    info_corrida.style.display = "none";
    pagamento_final.style.display = "block"
})

document.querySelector('#voltar').addEventListener('click', ()=> {
    pagamento_final.style.display = "none";
    info_corrida.style.display = "block"
})

const radioButtons = document.querySelectorAll('input[name="forma_pgt"]');

for(const radioButton of radioButtons){
    radioButton.addEventListener('change', (e)=>{
        if(e.target.value !== 'pix'){
            document.querySelector('#info_pix').style.display = "none"
            document.querySelector('#info_cartao').style.display = "flex"
        }else{
            document.querySelector('#info_pix').style.display = "flex"
            document.querySelector('#info_cartao').style.display = "none"
        }
    });
}

document.querySelector('#pgto_realizado').addEventListener('click', ()=>{
    let valido = true

    for(var i = 0; i < radioButtons.length; i++) {
        if(radioButtons[i].checked) selectedValue = radioButtons[i].value;   
    }

    if(selectedValue !== 'pix'){
        const nro_cartao = document.querySelector('#nro_cartao').value;
        const erro_nro = document.querySelector('.erro_nro_cartao');

        const validade = document.querySelector('#validade_cartao').value;
        const erro_val = document.querySelector('.erro_val_cartao');

        const cvv = document.querySelector('#cvv_cartao').value;
        const erro_cvv = document.querySelector('.erro_cvv_cartao');

        function validaNumero(number, erro){
            if(isNaN(number) || number.length <= 2 || number < 0){
                erro.style.display = "inline-block"
                return false;
            }else{
                erro.style.display = "none" 
                return true;           
            }
        }

        function validarData (data, erro) {
            data_formatada = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
            var data_array = data_formatada.split("-"); // quebra a data em array
            
            // para o IE onde será inserido no formato dd/MM/yyyy
            if(data_array[0].length != 4){
                data_formatada = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
            }

            var hoje = new Date() 
            var val  = new Date(data_formatada);
            val.setDate(val.getDate() + 1);

            if(data.length == 0){
                erro.style.display = "inline-block"
                erro.textContent = 'Você precisa digitar uma data válida!'
                return false;
            } else if(val <= hoje){
                erro.style.display = "inline-block"
                erro.textContent = 'Seu cartão está vencido!'
                return false;
            }
            else {
                erro.style.display = "none"
                return true;
            }
        }

        if (validaNumero(nro_cartao, erro_nro) &&
            validaNumero(cvv, erro_cvv) &&
            validarData(validade, erro_val)) {
                pagamento_final.style.display = "none";
                corrida.style.display = "block"
        }
    }
})

document.querySelector('#copiar_pix').addEventListener('click', ()=>{
    const codigo = document.querySelector('#cod_pix')
    const sucesso = document.querySelector('.sucesso_copia')

    codigo.select();
    codigo.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(codigo.value);

    sucesso.style.display = "inline-block"
})