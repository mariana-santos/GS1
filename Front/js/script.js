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
const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector(".close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModal());
});

document.querySelector('#etapa2').addEventListener('click', ()=>{
    document.getElementById('confirmar_carro').style.display = "none";
    document.getElementById('andamento').children[1].classList.add('done');
    document.getElementById('destino').style.display = "flex";
})