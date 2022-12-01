var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    
    if(scrollY>50){
        if (prevScrollpos > currentScrollPos) {
            document.querySelector(".bemvindo_h3").style.display = "block";
            document.querySelector("header").style.padding = "2em 4em";
            document.querySelector(".logo").style.margin = "23px 0";
        } else {
            document.querySelector(".bemvindo_h3").style.display = "none";
            document.querySelector("header").style.padding = "0 4em";
            document.querySelector(".logo").style.margin = "0";
        }
        prevScrollpos = currentScrollPos;
    }
}

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

    el.addEventListener("click", () => {
        const origem = document.querySelector('#end_origem').value;
        const erro = document.querySelector('.erro_origem');
        if (origem !== '') {
            document.querySelectorAll('.origem').forEach((el)=> el.innerHTML = origem)
            toggleModal();
            erro.style.display = "none";
        }
        else erro.style.display = "inline-block"
    });
     
})

document.querySelector('#etapa2').addEventListener('click', ()=>{
    document.getElementById('confirmar_carro').style.display = "none";
    document.getElementById('andamento').children[1].classList.add('done');
    document.getElementById('destino').style.display = "flex";
})

document.querySelector('#etapa1').addEventListener('click', ()=>{
    document.getElementById('confirmar_carro').style.display = "flex";
    document.getElementById('andamento').children[1].classList.remove('done');
    document.getElementById('destino').style.display = "none";
})

const destino = document.querySelector('#end_destino');

destino.addEventListener('keyup', ()=> {
    document.querySelectorAll('.destino').forEach((el)=> el.innerHTML = destino.value)
})

document.querySelector('#etapa3').addEventListener('click', ()=>{
        const erro = document.querySelector('.erro_destino');
        if (destino !== '') {
            erro.style.display = "none";
            document.getElementById('pagamento').style.display = "flex";
            document.getElementById('andamento').children[2].classList.add('done');
            document.getElementById('destino').style.display = "none";
        }
        else erro.style.display = "inline-block"
})

document.querySelector('#volta_destino').addEventListener('click', ()=>{
    document.getElementById('destino').style.display = "flex";
    document.getElementById('andamento').children[2].classList.remove('done');
    document.getElementById('pagamento').style.display = "none";
})

document.querySelector('#copiar_pix').addEventListener('click', ()=>{
    const codigo = document.querySelector('#cod_pix')
    const sucesso = document.querySelector('.sucesso_copia')

    codigo.select();
    codigo.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(codigo.value);

    sucesso.style.display = "inline-block"
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

document.querySelector('#etapa4').addEventListener('click', ()=>{

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
        document.getElementById('retirada').style.display = "flex";
        document.getElementById('andamento').children[3].classList.add('done');
        document.getElementById('pagamento').style.display = "none";
    }
})

document.querySelector('#etapa5').addEventListener('click', ()=> {
    document.getElementById('corrida').style.display = "flex";
    document.getElementById('andamento').style.display = "none";
    document.getElementById('title').style.display = "none";
    document.getElementById('retirada').style.display = "none";
})