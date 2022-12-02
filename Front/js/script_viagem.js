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

        function validar(valor, erro){
            if(valor == ''){
                valido = false
                erro.style.display = "inline-block"
            }
        }

        validar(nro_cartao, erro_nro)
        validar(cvv, erro_cvv)
        validar(validade, erro_val)
    }

    if (valido) {
        pagamento_final.style.display = "none";
        corrida.style.display = "block"
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