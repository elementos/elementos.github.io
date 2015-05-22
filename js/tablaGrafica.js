var currentElem=1;
var numElems=jsonTable.length-1;

function onKeyDown(event){
    var keyCode = event.which;
    var oldElem=currentElem;
    
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
    }
        
    if (currentElem!=oldElem) {
        unfocus(oldElem);
        focus(currentElem);
    }
}

$(document).ready(function(){
    //document.onkeydown = onKeyDown;
    $(document).keydown(function(event){
                        onKeyDown(event)
    })
    
    var tab=document.getElementById("table");
    var h=10;
    var w=5.55;
    
    for(var z=1;z<jsonTable.length;z++){
        var elem=jsonTable[z];
        var div=document.createElement("a");
        div.href="mostrarElemento.html?z="+elem.atomic_number+"&back=tablaGrafica.html";
        div.id="el"+elem.atomic_number;
        div.className="grupo"+getGrupo(elem.atomic_number)+" periodo"+getPeriodo(elem.atomic_number);
        div.innerHTML=elem.name;
        div.value=elem.name;
        div.className="element";
        div.className+=(" "+clasif[getClasificacion(z)]);
        
        if (getGrupo(elem.atomic_number)==3 && getPeriodo(elem.atomic_number)==6) {
            //actinido
            div.style.left=.27+(w*(elem.atomic_number-55))+"%";
            div.style.top=.27+(h*7)+"%";
        }
        else if (getGrupo(elem.atomic_number)==3 && getPeriodo(elem.atomic_number)==7) {
            //lantanido
            div.style.left=.27+(w*(elem.atomic_number-87))+"%";
            div.style.top=.27+(h*8)+"%";
        }
        else{
            div.style.left=.27+(w*(getGrupo(elem.atomic_number)-1))+"%";
            div.style.top=.27+(h*(getPeriodo(elem.atomic_number)-1))+"%";
        }    
        tab.appendChild(div);
    };
    
    var div=document.createElement("div");
    div.id="el"+"lantanidos";
    //div.innerHTML="lantanidos";
    div.className="element lantanido";
    div.style.left=.27+(w*(3-1))+"%";
    div.style.top=.27+(h*(6-1))+"%";
    tab.appendChild(div);
    
    var div=document.createElement("div");
    div.id="el"+"actinidos";
    //div.innerHTML="actinidos";
    div.className="element actinido";
    div.style.left=.27+(w*(3-1))+"%";
    div.style.top=.27+(h*(7-1))+"%";
    tab.appendChild(div);
    
    focus(1);
});