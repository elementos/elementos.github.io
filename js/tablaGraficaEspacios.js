var currentElem=1;
var numElems=18*7;

function onKeyDown(event){
    var keyCode = event.which;
    var oldElem=currentElem;
    
    if (keyCode == keys.ARROW_LEFT){
        currentElem--;
        if (currentElem<1) {
            currentElem=1;
        } else if (currentElem==93) {
            currentElem=142;
        } else if (currentElem==111) {
            currentElem=160;
        } else if (currentElem==127) {
            currentElem=92;
        } else if (currentElem==145) {
            currentElem=110;
        }
    } else if (keyCode == keys.ARROW_RIGHT){
        currentElem++;
        if (currentElem==numElems+1) {
            currentElem=numElems;
        } else if (currentElem==93) {
            currentElem=128;
        } else if (currentElem==111) {
            currentElem=146;
        } else if (currentElem==143) {
            currentElem=94;
        } else if (currentElem==161) {
            currentElem=112;
        }
        
        
    } else if (keyCode == keys.ARROW_UP){
        if (currentElem>=128 && currentElem<=142) {
            currentElem=75;
        }else if (currentElem>18) {
            currentElem-=18;
        }
    } else if (keyCode == keys.ARROW_DOWN){
        if (currentElem==75) {
            currentElem=128;
        }
        else if (currentElem<=108 || (currentElem>=128 && currentElem<=142)) {
            currentElem+=18;
        }
    } else if (keyCode == keys.HOME) {
        currentElem=1;
    } else if (keyCode == keys.END) {
        currentElem=numElems;
    } else if (keyCode == keys.PAGE_UP) {
        currentElem=1;
    } else if (keyCode == keys.PAGE_DOWN) {
        currentElem=128;
    }
        
    if (currentElem!=oldElem) {
        console.log(currentElem);
        unfocus(oldElem);
        focus(currentElem);
    }
}
var divs=[];
$(document).ready(function(){
    //document.onkeydown = onKeyDown;
    $(document).keydown(function(event){
                        onKeyDown(event)
    })
    
    var tab=document.getElementById("table");
    var h=10;
    var w=5.50;
    for (var y=1;y<=7;y++){
        for(var x=1;x<=18;x++){
            if (x==3 && y==6) {
                //lantanido
                for(var z=57;z<72;z++){
                    drawElem(tab,.27+(w*(elem.atomic_number-54))+"%",.27+(h*7)+"%",elem.atomic_number-54+((7)*18),z)
                }
            } else if (x==3 && y==7) {
                //actinido
                for(var z=89;z<104;z++){
                    drawElem(tab,.27+(w*(elem.atomic_number-86))+"%",.27+(h*8)+"%",elem.atomic_number-86+((8)*18),z)
                }
            }else{
                var zelem="";
                    for(var z=1;z<jsonTable.length;z++){
                        if (getGrupo(z)==x && getPeriodo(z)==y) {
                            zelem=z;
                        }
                    }
                if (zelem) {
                    drawElem(tab,.27+(w*(x-1))+"%",.27+(h*(y-1))+"%",x+((y-1)*18),zelem)
                } else{
                    drawElem(tab,.27+(w*(x-1))+"%",.27+(h*(y-1))+"%",x+((y-1)*18))
                }
            }
        }
    }
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