"use strict";

let usePlasma = document.querySelector("#usePlasma");
let useEnnergie = document.querySelector("#useEnnergie");
let useBouclier = document.querySelector("#useBouclier");
let useChasseur = document.querySelector("#useChasseur");

let pvAllier = document.querySelector("#aVie");
let pvEnnemie = document.querySelector("#eVie");
let amiral = document.querySelector("#message p");
let vAllier = document.querySelector("#vAllier");
let vEnnemie = document.querySelector("#vEnnemie");
let chasseur1 = document.querySelector("#chasseur1");
let chasseur2 = document.querySelector("#chasseur2");
let chasseur3 = document.querySelector("#chasseur3");
let chasseur4 = document.querySelector("#chasseur4");

let piuAllier = document.querySelector("#piuAllierD");
let piuEnnemie = document.querySelector("#piuEnnemieD");
let piuChasseur1 = document.querySelector("#piuChasseur1");
let piuChasseur2 = document.querySelector("#piuChasseur2");
let piuChasseur3 = document.querySelector("#piuChasseur3");
let piuChasseur4 = document.querySelector("#piuChasseur4");

let boumEnnemie = document.querySelector("#boumEnnemie");
let boumAllier = document.querySelector("#boumAllier");

//-----------M--------------//

let allier = {
    pv: 250,
    plasma: false,
    energie: true,
    shield: true,
    chasseur: 4,
    tirePlasma: true,
    boum: false,
}

let ennemie = {
    pv: 250,
    piu: false,
    stun: false,
    boum: false,
}

let chasseur = {
    c1: false,
    c2: false,
    c3: false,
    c4: false
}

let messages = {
    debut: "Ennemie en approche. J'attend vos instructions mon commandant.",
    Plasmas: "Armer les canons Plasma. Feu !",
    dammageEnnemie: "Ils ont l'aire d'avoir subit de gros dommages !",
    ennemieCantPlay: "Il semblerais que l'ennemie est encore sous l'emprise du rayon à Ennergie.",
    attacEnnemie: "L'ennemie nous attaque, accrochez vous !",
    dammageAllier: "La coque de notre vaisseau à été endommager.",
    perdu: "Adieu mon commandant, ce fut un honneur d'etre dans votre équipage.",
    gagne: "Nous avons réussi, le vaisseau ennemie est détruit !"
}

let message = messages.debut;


//---------------C------------//


usePlasma.addEventListener("click", function() {
    message = messages.Plasmas;
    allier.plasma = true;
});

piuAllier.addEventListener("animationend", function() {
    message = messages.dammageEnnemie;
    allier.plasma = false;
    ennemie.pv -= Math.trunc((Math.random() * 10) + 10);
    ennemie.boum = true;
});

boumEnnemie.addEventListener("animationend", function() {
    ennemie.boum = false;
    message = messages.attacEnnemie;
    ennemie.piu = true;
});

piuEnnemie.addEventListener("animationend", function() {
    ennemie.piu = false;
    allier.pv -= Math.trunc((Math.random() * 10) + 10);
    allier.boum = true;
});

boumAllier.addEventListener("animationend", function() {
    allier.boum = false;
    message = messages.dammageAllier;
});

useEnnergie.addEventListener("click", function() {
    console.log("Pas encore pret !");
});

useBouclier.addEventListener("click", function() {
    console.log("Pas encore pret !");
});

useChasseur.addEventListener("click", function() {
    console.log("Pas encore pret !");
});


//----------------V---------//


setInterval(function() {
    pvAllier.style.width = allier.pv + "px";
    pvAllier.textContent = allier.pv;
    pvEnnemie.style.width = ennemie.pv + "px";
    pvEnnemie.textContent = ennemie.pv;
    amiral.textContent = message;
    if (allier.plasma === true) {
        piuAllier.style.display = "block";
    } else if (allier.plasma === false) {
        piuAllier.style.display = "none";
    }
    if (ennemie.boum === true) {
        boumEnnemie.style.display = "block";
    } else if (ennemie.boum === false) {
        boumEnnemie.style.display = "none";
    }
    if (ennemie.piu === true) {
        piuEnnemie.style.display = "block";
    } else if (ennemie.piu === false) {
        piuEnnemie.style.display = "none";
    }
    if (allier.boum === true) {
        boumAllier.style.display = "block";
    } else if (allier.boum === false) {
        boumAllier.style.display = "none";
    }
}, 40);