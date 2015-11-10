var currentElem=1;
var numElems=jsonTable.length-1;

function onKeyDown(event){
    var keyCode = event.which;
    var oldElem=currentElem;
    var pressedMovementKey = true;

    if (keyCode == keys.ARROW_LEFT){
        currentElem--;
        if (currentElem<1) {
            currentElem=1;
        }
    } else if (keyCode == keys.ARROW_RIGHT){
        currentElem++;
        if (currentElem>numElems) {
            currentElem=numElems;
        }
    } else if (keyCode == keys.ARROW_UP){
        if (currentElem>=72) {
            currentElem-=32;
        } else if (currentElem>=57) {
            currentElem=39;
        } else if (currentElem>30) {
            currentElem-=18;
        } else if (currentElem>20) {
        //nothing
        } else if (currentElem>9) {
            currentElem-=8;
        } else if (currentElem==3) {
            currentElem=1;
        }
    } else if (keyCode == keys.ARROW_DOWN){
        if (currentElem==1) {
            currentElem=3;
        } else if (currentElem<=12) {
            currentElem+=8;
        } else if (currentElem<=39) {
            currentElem+=18;
        } else if (currentElem<=86) {
            currentElem+=32;
        }
    } else if (keyCode == keys.HOME) {
        currentElem=1;
    } else if (keyCode == keys.END) {
        currentElem=numElems;
    } else if (keyCode == keys.PAGE_UP) {
        currentElem=1;
    } else if (keyCode == keys.PAGE_DOWN) {
        currentElem=57;
    } else{
        pressedMovementKey = false;
    }
    
    if (pressedMovementKey){
        event.preventDefault();
    }

    if (currentElem!=oldElem) {
        unfocus(oldElem);
        focus(currentElem);
        
    }
}

var positions = [
//01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18
   1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
   3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9,10,
  11,12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13,14,15,16,17,18,
  19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,
  37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,
  55,56,-1,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,
  87,88,-2,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71, 0,
   0,0,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103, 0,0
]

$(document).ready(function(){
    //document.onkeydown = onKeyDown;
    $(document).keydown(function(event){
                        onKeyDown(event)
    })
    //TODO poner link volver
    var tab=document.getElementById("table");
    var table = document.createElement("table")
    tab.appendChild(table)
    var tr = document.createElement("tr")
    
    for (var i=0;i<=18; i++){
        var th = document.createElement("th")
        if (i>0){
            th.innerHTML="grupo<br/>"+i
        }else{
            var a = document.createElement("a")
            a.innerHTML="volver"
            a.href="index.html"
            th.appendChild(a)
        }
        tr.appendChild(th)
    }

    for(var i=0;i<positions.length;i++){
        z=positions[i]
        var td = document.createElement("td");
        //td.width=200
        //td.height=40
        if (z == -1){
            var a=document.createElement("a")
            
            var elemTitle = document.createElement("div");
            elemTitle.innerHTML = "57-71<br/>*";
            elemTitle.className = "elemTitle";
            a.appendChild(elemTitle)

            var elemBody = document.createElement("div");
            elemBody.innerHTML="lantanidos"
            elemBody.className = "elemBody";
            a.appendChild(elemBody)
            td.appendChild(a)
            td.className="element lantanido";
        }
        else if (z == -2){
            var a=document.createElement("a")

            var elemTitle = document.createElement("div");
            elemTitle.innerHTML = "89-103<br/>*";
            elemTitle.className = "elemTitle";
            a.appendChild(elemTitle)

            var elemBody = document.createElement("div");
            elemBody.innerHTML="actinidos"
            elemBody.className = "elemBody";
            a.appendChild(elemBody)
            td.appendChild(a)
            td.className="element actinido";
        }
        else if (z != 0){
            var elem=jsonTable[z];
            var a=document.createElement("a")

            a.href = "mostrarElemento.html?z="+elem.atomic_number+"&back=tablaGrafica.html";

            var elemTitle = document.createElement("div");
            elemTitle.innerHTML = z + "<br/>" + elem.symbol;
            elemTitle.className = "elemTitle";
            a.appendChild(elemTitle)

            var elemBody = document.createElement("div");
            elemBody.innerHTML=elem.name
            elemBody.className = "elemBody";
            a.appendChild(elemBody)

            a.title=elem.name
            a.id="el"+elem.atomic_number;
            td.appendChild(a)
            
            td.className="element grupo"+getGrupo(elem.atomic_number)+" periodo"+getPeriodo(elem.atomic_number);
            td.value=elem.name;
            td.className+=(" "+clasif[getClasificacion(z)]);
        }
        if (!(i%18) ) {
            table.appendChild(tr);
            tr = document.createElement("tr");
            th = document.createElement("th");
            th.scope="row";
            
            if (((i/18))<7){
                th.innerHTML="periodo<br/>"+((i/18)+1)
            }
            tr.appendChild(th)
        }
        tr.appendChild(td);
    };
        
    focus(1);
});
