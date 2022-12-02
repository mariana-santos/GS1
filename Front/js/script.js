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
        if (window.location.href.indexOf('index.html') > -1){
            const origem = document.querySelector('#end_origem').value;
            const erro = document.querySelector('.erro_origem');
            if (window.location.href.indexOf('index.html') > -1 && origem !== '') {
                document.querySelectorAll('.origem').forEach((el)=> el.innerHTML = origem)
                toggleModal();
                erro.style.display = "none";
            }
            else erro.style.display = "inline-block"
        } 

        else toggleModal();
        
    });
})

const etapa1 = document.getElementById('confirmar_carro');
const etapa2 = document.getElementById('destino');
const etapa3 = document.getElementById('pagamento');
const etapa4 = document.getElementById('retirada');
const etapa5 = document.getElementById('corrida');
const andamento = document.getElementById('andamento');

function mudarTela(atual, etapa, proxima, voltar_avancar){
    etapa--;
    atual.style.display = "none";
    voltar_avancar == 'avancar' ? andamento.children[etapa].classList.add('done') : andamento.children[etapa].classList.remove('done')
    proxima.style.display = "flex"
}

document.querySelector('#etapa2').addEventListener('click', ()=> mudarTela(etapa1, 2, etapa2, 'avancar'))
document.querySelector('#etapa1').addEventListener('click', ()=> mudarTela(etapa2, 2, etapa1, 'voltar'))

const destino = document.querySelector('#end_destino');

destino.addEventListener('keyup', ()=> {
    document.querySelectorAll('.destino').forEach((el)=> el.innerHTML = destino.value)
})

document.querySelector('#etapa3').addEventListener('click', ()=>{
        const erro = document.querySelector('.erro_destino');
        if (destino !== '') {
            erro.style.display = "none";
            mudarTela(etapa2, 3, etapa3, 'avancar')
        }
        else erro.style.display = "inline-block"
})

document.querySelector('#volta_destino').addEventListener('click', ()=> mudarTela(etapa3, 3, etapa2, 'voltar'))

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

    if (valido) mudarTela(etapa3, 4, etapa4, 'avancar')
})

document.querySelector('#etapa5').addEventListener('click', ()=> {
    
    mudarTela(etapa4, 4, etapa5, 'avancar')

    document.getElementById('andamento').style.display = "none";
    document.getElementById('title').style.display = "none";
})