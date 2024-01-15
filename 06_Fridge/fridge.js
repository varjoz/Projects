var kategoriak = [];
var fridge = [];
var HTMLitemlist = document.getElementById("itemlist");
var HTMLkategoriak = document.getElementById("kategoriak");

/////////////////////////////////////////////////////////////////////////////////////////////////////
//  CATHEGORY DRAWING====================================================
function addCateg(katName, katId, katIcon) {
    kategoriak.push({
        name: katName,
        id: katId,
        icon: katIcon,
    });
}

function loadCateg() {
    var HTML = "";
    for (var i = 0; i < kategoriak.length; i++) {
        HTML +=
            '<div class="kategoria"><img src="Icons/' +
            kategoriak[i].icon +
            '.png" id="' +
            kategoriak[i].id +
            '" alt="' +
            kategoriak[i].name +
            '"/></div>';
    }
    HTMLkategoriak.innerHTML = HTML;
}

// RENDER THE FRIDGE ====================================================

function addItem(kategID, itemName, itemExp, itemNotes) {
    fridge.push({
        id: "id" + Math.random().toString(16).slice(2), //generated UNIQUE!! hash
        categoryId: kategID, //id of the clicked category
        name: itemName,
        expiry: itemExp, //YYYY-MM-DD format
        notes: itemNotes,
    });
}

function loadList() {
    // var a = '<div class="item">Let\'s go<div>';

    /*for (var i = 0; i < fridge.length; i++) {
        HTML +=
            '<div class="item" id="' +
            fridge[i].id +
            '"><img src="Icons/' +
            fridge[i].categoryId +
            '.png" alt="' +
            fridge[i].categoryId +
            '"/><div class="item-text"><h2>' +
            fridge[i].name +
            "</h2><h3>" +
            fridge[i].expiry +
            "</h3><h4>" +
            fridge[i].notes +
            "</h4></div>" +
            '<div class="actions">' +
            '<img src="Icons/felkialtojel.png" id="warning" alt="felkialtojel" />' +
            '<img src="Icons/cog.png" alt="cog" />' +
            "</div></div>";
        HTML += `<div class="item" id="${fridge[i].id}">
            <img src="Icons/${fridge[i].categoryId}.png" alt="${fridge[i].categoryId}"/>    
        </div>`;
    }
    */

    //template literal /// lambda fuggveny (item, i) =>  function rovidites
    var HTML = "";

    fridge.forEach((item, i) => {
        var additionalClasses = "";
        var expireDate = new Date(item.expiry);
        var nextweek = new Date();
        nextweek.setDate(nextweek.getDate() + 7);

        if (nextweek.getTime() >= expireDate.getTime()) {
            additionalClasses += "expiring";
        }

        HTML += `<div class="item ${additionalClasses}" id="${item.id}">
            <img src="Icons/${item.categoryId}.png" alt="${item.categoryId}"/>   
            <div class="item-text">
                <h2>${item.name}</h2>
                <h3>${item.expiry}</h3>
                <h4>${item.notes}</h4>
            </div>
            <div class="actions">
                <img src="Icons/felkialtojel.png" class="warning" alt="felkialtojel" />
                <img src="Icons/cog.png" class="cog" onclick="cog_showActions('${item.id}')" alt="cog" />
                <div class="cogActions">
                    <p class="modify" onclick="cog_modify_showWindow('${item.id}')">szerkesztés</p>
                    <p class="delete" onclick="cog_delete_showConfirm('${item.id}')">törlés</p>
                </div>
            </div>
        </div>`;
    });
    HTMLitemlist.innerHTML = HTML;
}

function cog_showActions(id) {
    var item = document.getElementById(id);
    item.classList.toggle("actions-opened");
}

function cog_modify_showWindow(id) {
    var item = document.getElementById(id);
    console.log("Elojon a szerkesztes ablak");
}

function cog_delete_showConfirm(id) {
    var item = document.getElementById(id);
    let text = "Valóban szeretnéd törölni?";
    if (confirm(text) == true) {
        // var index =
        // console.log(id);
        // fridge.splice(index, 1);
    } else {
        // console.log("megse");
    }
    // betoltom ujra a listat
}
//#############################################################################################
// Itt hagytam abba
// Cog gombra valo kattintas utan elojon a kis menu, ahol tudom modositani, valamint torolni az adott
//############################################################################################
/////////////////////////////////////////////////////////////////////////////////////////////////////
// KATEGORIANEV + ID + KATEGORIAIKON
addCateg("pekaru", "pekaru", "pekaru");
addCateg("husok", "husok", "husok");
addCateg("zoldseg-gyumolcs", "zoldseg-gyumolcs", "zoldsegek");
addCateg("olaj", "olaj-zsir", "olaj-zsir");
addCateg("gabonafelek", "gabonafelek", "gabonafelek");
addCateg("koretek", "koretek", "koretek");
addCateg("fuszerek", "fuszerek", "fuszerek");
addCateg("vitaminok", "vitaminok", "vitaminok");
addCateg("uditok", "uditok", "uditok");
addCateg("konzervek", "konzervek", "konzerv");
addCateg("nasik", "nasik", "nasik");
addCateg("edessegek", "edessegek", "edessegek");
addCateg("teszta", "teszta", "teszta");
addCateg("halak", "halak", "halak");
addCateg("szoszok", "szoszok", "szoszok");
addCateg("keszetelek", "keszetelek", "keszetelek");
loadCateg();

// kategID, itemName, itemExp, itemNotes
addItem("pekaru", "Rozskenyer", "2023-09-03", "Aldiban vettuk");
addItem("halak", "Tonhal", "2024-09-01", "250 gramm");
addItem("konzerv", "Chillis bab", "2023-12-12", "Tesco");
addItem("szoszok", "Mustar", "2023-09-11");
addItem("teszta", "Fussili", "2024-09-01", "0.5 kg");
addItem("vitaminok", "C vitamin", "2023-09-03", "100 db");
loadList();
