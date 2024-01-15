var tabla = ["-","-","-","-","-","-","-","-","-"];
var megoldasok  = [];
megoldasok [0] = [0,1,2];
megoldasok [1] = [3,4,5];
megoldasok [2] = [6,7,8];
megoldasok [3] = [0,3,6];
megoldasok [4] = [1,4,7];
megoldasok [5] = [2,5,8];
megoldasok [6] = [0,4,8];
megoldasok [7] = [2,4,6];
var isPlayer = false;

// console.log("isPlayer erteke " + isPlayer);

// tabla[0] + tabla[1] + tabla[2] === 'XXX'
// tabla[0] + tabla[1] + tabla[2] === '000'

// Tabla megrajzolasa
function load() {
    // var valami;
    var elemHTML = '';
    for (var i = 0; i < 9; i++) {
        var value;
        if(tabla[i] != undefined) {
            value = tabla[i];
        } else {
            value = "";
        } 
        elemHTML += '<div class="negyzet" onClick="katt('+i+')">' + value + '</div>';
    }
    container.innerHTML = elemHTML;
    // jatekos kapcsolo = (X) isPlayer = true, (O) isPlayer = false
    isPlayer = !isPlayer;
    // console.log("isPlayer erteke " + isPlayer);
}

function katt(i) {
 tabla[i] = getNextSymbol();
    load();
    checkWin();
}

// szimbolum kirajzolasa
function getNextSymbol() {
    var value;
    if (isPlayer == true) {
        value = "X";
    } else {
        value = "O";
    }
    return value;
};

function checkWin () {
    for (var i=0; i<megoldasok.length; i++) {
        
        var hasonlitott = tabla[megoldasok[i][0]] + tabla[megoldasok[i][1]] + tabla[megoldasok[i][2]];
        if(hasonlitott == "XXX") {
            window.alert("X NYERT!");
            break;
        } 
        if(hasonlitott == "OOO") {
            window.alert("O NYERT!"); 
            break;
        }
    }
}

load();




