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