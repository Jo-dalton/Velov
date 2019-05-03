/*Script du diaporama*/

//Ci-dessous mes sources vers mes différentes images//
var images = [
    "/diapo1.jpg",
    "/diapo2.jpg",
    "/diapo3.jpg"
];
var num = 0;

//Afin de faire fonctionner mon diaporama j'indique par script les ID et la source qui servira à mon slider//

function next() {
    var slider = document.getElementById('diapo');
    num++;
    if(num >= images.length) {
        num = 0;
    }
    slider.src = images[num];

}


function prev() {
    var slider = document.getElementById('diapo');
    num--;
    if(num < 0) {
        num = images.length-1;
    }
    slider.src = images[num];

}


/*Ici le script permettant de tourner les diapos avec les touches fléchées gauche et droite*/

document.addEventListener("keydown", function(e){
    if(e.keyCode === 37){
        prev();
    }
    else if(e.keyCode === 39){
        next();
    }
    });

