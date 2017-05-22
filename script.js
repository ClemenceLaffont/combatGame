"use strict";

let usePlasma = document.querySelector("#usePlasma");
let useEnnergie = document.querySelector("#useEnnergie");
let useBouclier = document.querySelector("#useBouclier");
let useChasseur = document.querySelector("#useChasseur");

let pvAllier = document.querySelector("#aVie");
let pvEnnemie = document.querySelector("#eVie");
let amiral = document.querySelector("#message p");
let final = document.querySelector("h1");
let vAllier = document.querySelector("#vAllier");
let vEnnemie = document.querySelector("#vEnnemie");
let chasseur1 = document.querySelector("#chasseur1");
let chasseur2 = document.querySelector("#chasseur2");
let chasseur3 = document.querySelector("#chasseur3");
let chasseur4 = document.querySelector("#chasseur4");
let chasseurRestant = document.querySelector("#chasseurRestant");

let piuAllier = document.querySelector("#piuAllierD");
let piuEnnemie = document.querySelector("#piuEnnemieD");
let piuChasseur1 = document.querySelector("#piuChasseur1");
let piuChasseur2 = document.querySelector("#piuChasseur2");
let piuChasseur3 = document.querySelector("#piuChasseur3");
let piuChasseur4 = document.querySelector("#piuChasseur4");

let boumEnnemie = document.querySelector("#boumEnnemie");
let boumAllier = document.querySelector("#boumAllier");

let bouclier = document.querySelector("#bouclier")

//-----------M--------------//

let gagne = false;
let perdu = false;

let allier = {
    pv: 250,
    plasma: false,
    energie: true,
    bouclier: false,
    chasseur: 4,
    boum: false,
}

let ennemie = {
    pv: 250,
    piu: false,
    stun: false,
    boum: false,
}

let chasseur = {
    tire: false,
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
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
    message = messages.Plasmas;
    allier.plasma = true;
    chasseur.tire = true;
});

piuAllier.addEventListener("animationend", function() {
    message = messages.dammageEnnemie;
    allier.plasma = false;
    chasseur.tire = false;
    ennemie.pv -= Math.trunc((Math.random() * 10) + 10);
    if (chasseur.c1 === true) {
        ennemie.pv -= Math.trunc((Math.random() * 5) + 3);
    }
    if (chasseur.c2 === true) {
        ennemie.pv -= Math.trunc((Math.random() * 5) + 3);
    }
    if (chasseur.c3 === true) {
        ennemie.pv -= Math.trunc((Math.random() * 5) + 3);
    }
    if (chasseur.c4 === true) {
        ennemie.pv -= Math.trunc((Math.random() * 5) + 3);
    }
    if (ennemie.pv <= 0) {
        ennemie.pv = 0;
    }
    ennemie.boum = true;
});

boumEnnemie.addEventListener("animationend", function() {
    ennemie.boum = false;
    message = messages.attacEnnemie;
    if (ennemie.pv === 0) {
        ennemie.piu = false;
        message = messages.gagne;
        gagne = true;
    } else {
        ennemie.piu = true;
    }
});

piuEnnemie.addEventListener("animationend", function() {
    ennemie.piu = false;
    allier.pv -= Math.trunc((Math.random() * 10) + 10);
    if (allier.pv <= 0) {
        allier.pv = 0;
    }
    allier.boum = true;
});

boumAllier.addEventListener("animationend", function() {
    allier.boum = false;
    if (allier.pv === 0) {
        message = messages.perdu;
        perdu = true;
    } else {
        message = messages.dammageAllier;
        usePlasma.disabled = false;
        useBouclier.disabled = false;
        useChasseur.disabled = false;
        useEnnergie.disabled = false;
    }

});

useEnnergie.addEventListener("click", function() {
    console.log("Pas encore pret !");
});

useBouclier.addEventListener("click", function() {

});

useChasseur.addEventListener("click", function() {
    if (chasseur.c1 === false) {
        chasseur.c1 = true;
    } else if (chasseur.c2 === false) {
        chasseur.c2 = true;
    } else if (chasseur.c3 === false) {
        chasseur.c3 = true;
    } else if (chasseur.c4 === false) {
        chasseur.c4 = true;
    }
    allier.chasseur -= 1;
});

chasseur1.addEventListener("animationend", function() {
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
    message = messages.attacEnnemie;
    ennemie.piu = true;
});
chasseur2.addEventListener("animationend", function() {
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
    message = messages.attacEnnemie;
    ennemie.piu = true;
});
chasseur3.addEventListener("animationend", function() {
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
    message = messages.attacEnnemie;
    ennemie.piu = true;
});
chasseur4.addEventListener("animationend", function() {
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
    message = messages.attacEnnemie;
    ennemie.piu = true;
});


//----------------V---------//


setInterval(function() {
    pvAllier.style.width = allier.pv + "px";
    pvAllier.textContent = allier.pv;
    pvEnnemie.style.width = ennemie.pv + "px";
    pvEnnemie.textContent = ennemie.pv;
    amiral.textContent = message;
    chasseurRestant.textContent = allier.chasseur;
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
    if (chasseur.c1 === true) {
        chasseur1.style.display = "block";
    }
    if (chasseur.c2 === true) {
        chasseur2.style.display = "block";
    }
    if (chasseur.c3 === true) {
        chasseur3.style.display = "block";
    }
    if (chasseur.c4 === true) {
        chasseur4.style.display = "block";
    }
    if (allier.chasseur === 0) {
        useChasseur.disabled = true;
    }
    if (chasseur.c1 === true && chasseur.tire === true) {
        piuChasseur1.style.display = "block";
    } else if (chasseur.tire === false) {
        piuChasseur1.style.display = "none";
    }
    if (chasseur.c2 === true && chasseur.tire === true) {
        piuChasseur2.style.display = "block";
    } else if (chasseur.tire === false) {
        piuChasseur2.style.display = "none";
    }
    if (chasseur.c3 === true && chasseur.tire === true) {
        piuChasseur3.style.display = "block";
    } else if (chasseur.tire === false) {
        piuChasseur3.style.display = "none";
    }
    if (chasseur.c4 === true && chasseur.tire === true) {
        piuChasseur4.style.display = "block";
    } else if (chasseur.tire === false) {
        piuChasseur4.style.display = "none";
    }
    if (gagne === true) {
        final.textContent = "You Win";
        final.style.display = "block";
    } else if (perdu === true) {
        final.textContent = "Game Over";
        final.style.display = "block";
    }
}, 40);