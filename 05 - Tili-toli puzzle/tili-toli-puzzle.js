var tabla = ["1","2","3","4","5","6","7","8","x"];
var winning = ["1","2","3","4","5","6","7","8","x"];

// tabla betoltese
function load() {
    var elemHTML = '';
    for (var i = 0; i < 9; i++) {
        var classname = "";
        if (tabla[i] == "x") {
            classname = "ures";
        }
        elemHTML += '<div class="negyzet '+ classname +'" onClick="katt('+i+')">' + tabla[i] + '</div>';
    }
    container.innerHTML = elemHTML;
}

load();

// Tabla osszekeveres
function shuffleArray(tabla) {
    for (var i = 0; i < tabla.length; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tabla[i];
        tabla[i] = tabla[j];
        tabla[j] = temp;
    }
    console.log(tabla);
};

// New Game gomb
document.getElementById("gomb").onclick = newgame;
function newgame() {
    shuffleArray(tabla);
    load();
    win.classList.remove('win');
};

// onClick esemeny
function katt(i) {
    if(isSzomszedos(i)) {
        csere(i);
        checkWin();
    }
};

// szomszedos-e?
function isSzomszedos(i) {
    var ures;
    var valid = false;
    for (var j = 0; j < tabla.length; j++) {
        if (tabla[j] == "x") {
            ures = j;
        }
    }
    console.log(ures,i);
    //3 tavolsagra van es a ugyanabban az oszlopban = maradeka ugyanaz 3-al valo osztas utan (alatta/felette)
    if ((Math.abs(i-ures) == 3) && (i%3 == ures%3)) {
        valid = true;
    }   
    //mellette van   egy sorban van = 3-al valo osztas eseten ugyannnyi az egeszresze
    if(Math.abs(i-ures) == 1 &&  Math.floor(i/3) == Math.floor(ures/3)) {
        valid = true;
    }
    return valid;
};

// ket mezo csereje
function csere(i) {
    for (var j = 0; j < tabla.length; j++) {
        if (tabla[j] == "x") {
            tabla[j] = tabla[i];
            tabla[i] = "x";
            // console.log(tabla[j]);
            break;
        }
    }
    load();
};

// nyero allapot kideritese
function checkWin() {
    var winningState = false;
    //
    var szamlalo = 0;
    for (var j = 0; j < tabla.length; j++) {
        if (tabla[j] == winning[j]) {
            szamlalo = szamlalo+1;
        }
        console.log("Ennyi egyezes van: " +szamlalo);
    }

    if (szamlalo == 9) {win.classList.add('win');}

    // if(winningState) {
    //     win.classList.add('win');
    // }
}



