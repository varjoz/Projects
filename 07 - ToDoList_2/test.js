var newTodoName = document.getElementById('newTodoName');
var hideDone = document.getElementById('hideDone');
var hideDeleted = document.getElementById('hideDeleted');
var addbtn = document.getElementById('addbtn');
var tablebody = document.getElementById('tablebody');
var toDoList = []

/**
 * Hozzaad egy todo-t a listahoz
 * 
 * @param {*} todoneve a hozzaadando todo neve
 * 
 */

function add(event) {
    //ha adott key, es entert nyomtunk, akkor adjuk hozza, ellenkezo esetben meg semmit se csinaljunk
    if(event && event.keyCode != 13) {
        return;
    }
    // a hozzadas gomb megnyomasara a "Elkészültek elrejtése" checkbox allapota false kell, hogy legyen!!
    toDoList.push({
        id: Math.random().toString(16).slice(2),//viszonylag nagy random szam
        name: newTodoName.value,
        ready: false,
        deleted: false
    });
    redraw();
    newTodoName.value = "";
}

/**
 * Ujrarajzolja a tablat
 *  
 * 
 */
function redraw() {
    let html = "";
    //a todolistet kirajzolja -> todoList = osszes todo
    //1) szabadszavas kereses
    //2) kulonbozo filterek beallitasa
    var filtered = toDoList.filter(function (elem) {
        var visible = true;
        
        if(hideDone.checked && elem.ready) {  //be van pipalva h keszek rejtese es az elem kesz
            visible = false;
        }
        if(visible && hideDeleted.checked && elem.deleted) { //ha meg nem rejtettuk el, be van pipalva h toroltek rejtese es az elem torolt
            visible = false;
        }
        return visible; //true ha mutatni kell, false ha nem
        //return elem.ready && hideDone.value  || !hideDone.value;
    });
    // }
    //MIUTAN MEGSZURTUK, ES CSAK AZOK MARADTAK AMIG MEGFELELNEK A FELTETELEKNEK
    //3) rendezes - mindig az utolso lepes!!

    filtered.sort((a, b) => {
        //-1 ha a > b
        // 1 ha a < b
    });

    for (let i = 0; i < filtered.length; i++) {
        let isChecked = filtered[i].ready === false ? " " : "checked";  
        let isDeleted = filtered[i].deleted === false ? " " : "torolt";  
        //legyen athuzva a sor, ha torolt 
        html += `
        <tr class="${isDeleted}"> 
            <th scope="row">${i+1}</th>
            <td>${filtered[i].name}</td>
            <td>
                <input type="checkbox" ${isChecked} onchange="finish('${filtered[i].id}')"/> 

            </td>
            <td>
                <button class="btn btn-warning" onclick="remove('${filtered[i].id}')">Törlés</button>
            </td>
        </tr>`
    }
    tablebody.innerHTML = html;
}
// /** Ujrarajzolja a tablat (meg mukodo verzio)
//  */
// function redraw() {
//     let html = "";
//     for (let i = 0; i < toDoList.length; i++) {
//         var isChecked = toDoList[i].ready === false ? " " : "checked";  
//         html += `
//         <tr>
//             <th scope="row">${i+1}</th>
//             <td>${toDoList[i].name}</td>
//             <td>
//                 <input type="checkbox" ${isChecked} onchange="finish(${i})"/> 

//             </td>
//             <td>
//                 -
//             </td>
//         </tr>`
//     }
//     tablebody.innerHTML = html;
// }

/**
 * Kitorol egy todo-t a listarol
 * 
 * @param {*} index az index, ahonnan ki kell torolni egy todo-t
 */
//hogyan lehet majd torolni a listabol?
function remove(index) {
    toDoList.splice(index, 0);
    console.log(toDoList);
    redraw();
}

//alsovonas = helper function 
function _change(id, attr, value) {
    toDoList.forEach((elem)=> {
        if(elem.id == id) {
            elem[attr] = value;
        }
    });
    redraw();
}

function finish(id) {
    _change(id, 'ready', true);
}

function remove(id) {
    _change(id, 'deleted', true);
}

