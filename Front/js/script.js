var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    
    if(scrollY>50){
        if (prevScrollpos > currentScrollPos) {
            document.querySelector("header").classList.remove('azul');
        } else {
            document.querySelector("header").classList.add('azul');
        }
        prevScrollpos = currentScrollPos;
    }
}