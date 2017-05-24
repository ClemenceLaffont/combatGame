"use strict";

let jeu = document.querySelector("#jeu");

let usePlasma = document.querySelector("#usePlasma");
let useEnnergie = document.querySelector("#useEnnergie");
let useBouclier = document.querySelector("#useBouclier");
let useChasseur = document.querySelector("#useChasseur");

let pvAllier = document.querySelector("#aVie div");
let pvEnnemie = document.querySelector("#eVie div");
let nbpvAllier = document.querySelector("#aVie h2");
let nbpvEnnemie = document.querySelector("#eVie h2");
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
let piuAllierEvent = document.querySelector("#piuAllierA");
let piuEnnemieEvent = document.querySelector("#piuEnnemieA");
let piuChasseur1 = document.querySelector("#piuChasseur1");
let piuChasseur2 = document.querySelector("#piuChasseur2");
let piuChasseur3 = document.querySelector("#piuChasseur3");
let piuChasseur4 = document.querySelector("#piuChasseur4");

let boumEnnemie = document.querySelector("#boumEnnemie");
let boumAllier = document.querySelector("#boumAllier");

let bouclier = document.querySelector("#bouclier")

let ennergie = document.querySelector("#ennergie");
let stun = document.querySelector("#stun");

//-----------M--------------//

let gagne = false;
let perdu = false;

let allier = {
    pv: 250,
    plasma: false,
    energie: false,
    bouclier: false,
    countBouclier: 0,
    chasseur: 4,
    boum: false,
}

let ennemie = {
    pv: 250,
    piu: false,
    stun: false,
    countStun: 0,
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
    bouclier: "Activation du bouclier !",
    chasseur: "Faites sortir un chasseur du hangar !",
    ennergie: "Preparez le rayon a ennergie ! Attention, Feu !",
    dammageEnnemie: "Ils ont l'aire d'avoir subit de gros dommages !",
    rate: "nous avons manqué notre cible !",
    ennergieEnnemie: "Voila qui devrait les ralentir un moment !",
    ennemieCantPlay: "Il semblerais que l'ennemie est encore sous l'emprise du rayon à Ennergie.",
    attacEnnemie: "L'ennemie nous attaque, accrochez vous !",
    dammageAllier: "La coque de notre vaisseau à été endommager.",
    damageBouclier: "Le bouclier a absorbé la totalité des dégats.",
    perdu: "Adieu mon commandant, ce fut un honneur d'etre dans votre équipage.",
    gagne: "Nous avons réussi, le vaisseau ennemie est détruit !"
}

let message = messages.debut;


//---------------C------------//
function enable() {
    usePlasma.disabled = false;
    if (allier.bouclier === false) {
        useBouclier.disabled = false;
    }
    if (allier.chasseur != 0) {
        useChasseur.disabled = false;
    }
    if (ennemie.stun === false && ennemie.countStun === 0) {
        useEnnergie.disabled = false;
    } else {
        ennemie.countStun -= 1;
    }
}

function disable() {
    usePlasma.disabled = true;
    useBouclier.disabled = true;
    useChasseur.disabled = true;
    useEnnergie.disabled = true;
}

function tourEnnemie() {
    if (ennemie.countStun === 0) {
        ennemie.stun = false;
        ennemie.piu = true;
        message = messages.attacEnnemie;
    } else {
        message = messages.ennemieCantPlay;
        verifieBouclier();
        enable();
    }
}

function degaChasseur(lequel) {
    if (lequel === true) {
        ennemie.pv -= Math.trunc((Math.random() * 7) + 3);
    }
}

function verifieBouclier() {
    if (allier.countBouclier != 0) {
        allier.countBouclier -= 1;
    } else if (allier.countBouclier === 0) {
        allier.bouclier = false;
    }
}

usePlasma.addEventListener("click", function() {
    disable();
    message = messages.Plasmas;
    allier.plasma = true;
    chasseur.tire = true;
});

useEnnergie.addEventListener("click", function() {
    disable();
    message = messages.ennergie;
    allier.energie = true;
});

useBouclier.addEventListener("click", function() {
    disable();
    message = messages.bouclier;
    allier.bouclier = true;
    allier.countBouclier = 1;
    chasseur.tire = true;
});

useChasseur.addEventListener("click", function() {
    disable();
    message = messages.chasseur;
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

piuAllierEvent.addEventListener("animationend", function() {
    allier.plasma = false;
    chasseur.tire = false;
    let j = Math.random();
    if (j >= 0.9) {
        message = messages.rate;
    } else {
        ennemie.pv -= Math.trunc((Math.random() * 10) + 10);
        message = messages.dammageEnnemie;
    }
    degaChasseur(chasseur.c1);
    degaChasseur(chasseur.c2);
    degaChasseur(chasseur.c3);
    degaChasseur(chasseur.c4);
    if (ennemie.pv <= 0) {
        ennemie.pv = 0;
    }
    ennemie.boum = true;
});

boumEnnemie.addEventListener("animationend", function() {
    ennemie.boum = false;
    if (ennemie.pv === 0) {
        ennemie.piu = false;
        message = messages.gagne;
        gagne = true;
    } else {
        tourEnnemie();
    }
});

piuEnnemieEvent.addEventListener("animationend", function() {
    ennemie.piu = false;
    if (allier.bouclier === false) {
        message = messages.dammageAllier;
        allier.pv -= Math.trunc((Math.random() * 20) + 50);
        if (allier.pv <= 0) {
            allier.pv = 0;
        }
    } else {
        let i = Math.random();
        if (i <= 0.6) {
            message = messages.damageBouclier;
        } else {
            if (chasseur.c1 === true) {
                chasseur.c1 = false;
            } else if (chasseur.c2 === true && chasseur.c1 === false) {
                chasseur.c2 = false;
            } else if (chasseur.c3 === true && chasseur.c2 === false) {
                chasseur.c3 = false;
            } else if (chasseur.c4 === true && chasseur.c3 === false) {
                chasseur.c4 = false;
            } else {
                message = messages.damageBouclier;
            }
        }
    }
    allier.boum = true;
});

boumAllier.addEventListener("animationend", function() {
    allier.boum = false;
    if (allier.pv === 0) {
        message = messages.perdu;
        perdu = true;
    } else {
        enable();
        verifieBouclier();
    }
});

ennergie.addEventListener("animationend", function() {
    allier.energie = false;
    let j = Math.random();
    if (j >= 0.8) {
        message = messages.rate;
        ennemie.piu = true;
        ennemie.countStun = 1;
    } else {
        ennemie.stun = true;
        ennemie.countStun = 2;
        message = messages.ennergieEnnemie;
        enable();
        verifieBouclier();
    }
});

bouclier.addEventListener("animationend", function() {
    chasseur.tire = false;
    if (ennemie.pv <= 0) {
        ennemie.pv = 0;
    }
    if (chasseur.c1 === true || chasseur.c2 === true || chasseur.c3 === true || chasseur.c4 === true) {
        ennemie.boum = true;
        degaChasseur(chasseur.c1);
        degaChasseur(chasseur.c2);
        degaChasseur(chasseur.c3);
        degaChasseur(chasseur.c4);
    } else {
        tourEnnemie();
    }

});

chasseur1.addEventListener("animationend", function() {
    tourEnnemie();
});
chasseur2.addEventListener("animationend", function() {
    tourEnnemie();
});
chasseur3.addEventListener("animationend", function() {
    tourEnnemie();
});
chasseur4.addEventListener("animationend", function() {
    tourEnnemie();
});


//----------------V---------//


function verifieAffiche(bolean, element) {
    if (bolean === true) {
        element.style.display = "block";
    } else if (bolean === false) {
        element.style.display = "none";
    }
}

setInterval(function() {

    pvAllier.style.width = allier.pv + "px";
    nbpvAllier.textContent = allier.pv;
    pvEnnemie.style.width = ennemie.pv + "px";
    nbpvEnnemie.textContent = ennemie.pv;
    amiral.textContent = message;
    chasseurRestant.textContent = allier.chasseur;

    verifieAffiche(allier.plasma, piuAllier);
    verifieAffiche(ennemie.boum, boumEnnemie);
    verifieAffiche(ennemie.piu, piuEnnemie);
    verifieAffiche(allier.boum, boumAllier);
    verifieAffiche(chasseur.c1, chasseur1);
    verifieAffiche(chasseur.c2, chasseur2);
    verifieAffiche(chasseur.c3, chasseur3);
    verifieAffiche(chasseur.c4, chasseur4);
    verifieAffiche(allier.bouclier, bouclier);
    verifieAffiche(allier.energie, ennergie);
    verifieAffiche(ennemie.stun, stun);

    if (allier.boum === false) {
        boumAllier.style.left = "130px"
    }
    if (allier.boum === true && allier.bouclier === true) {
        boumAllier.style.left = "160px"
    }

    if (allier.energie === true) {
        jeu.className = "backEnnergie";
    } else if (allier.energie === false) {
        jeu.className = "";
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

}, 1);