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
            console.log(origem)
            if (origem !== '') {
                document.querySelectorAll('.origem').forEach((el)=> el.innerHTML = origem)
                toggleModal();
                erro.style.display = "none";
            }
            else erro.style.display = "inline-block"
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
        if (destino.value !== '') {
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
                mudarTela(etapa3, 4, etapa4, 'avancar')
        }
    }

})

document.querySelector('#etapa5').addEventListener('click', ()=> {
    
    mudarTela(etapa4, 4, etapa5, 'avancar')

    document.getElementById('andamento').style.display = "none";
    document.getElementById('title').style.display = "none";
})

document.querySelector('#enviar_msg').addEventListener('click', ()=>{

    const nome = document.querySelector('#nome').value;
    const erro_nome = document.querySelector('.erro_nome');

    const email = document.querySelector('#email').value;
    const erro_email = document.querySelector('.erro_email');

    const mensagem = document.querySelector('#mensagem').value;
    const erro_mensagem = document.querySelector('.erro_mensagem');

    function valida(item, erro){
        if(item.length <= 2){
            erro.style.display = "inline-block"
            return false;
        }else{
            erro.style.display = "none" 
            return true;           
        }
    }

    if (valida(nome, erro_nome)&&
        valida(email, erro_email) &&
        valida(mensagem, erro_mensagem)) {
            alert('Mensagem enviada com sucesso!')
            erro_email.style.display = "none";
            erro_mensagem.style.display = "none";
            erro_nome.style.display = "none";

            nome.value = "";
            email.value = "";
            mensagem.value = "";
    }

})