function getGrupo(num){
    var grupo=[0,1,18,
    1,2,13,14,15,16,17,18,
    1,2,13,14,15,16,17,18,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
    1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
    1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
    ];
    return grupo[num];
}
function getPeriodo(num){
    var periodo=[0,1,1,
            2,2,2,2,2,2,2,2,
            3,3,3,3,3,3,3,3,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
            5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
            6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
            7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7
            ];
    return periodo[num];
}

function getClasificacion(num){
   var clasificacion=[0,8,10,
            1,2,7,8,8,8,9,10,
            1,2,6,7,8,8,9,10,
            1,2,5,5,5,5,5,5,5,5,5,5,6,7,7,8,9,10,
            1,2,5,5,5,5,5,5,5,5,5,5,6,6,7,7,9,10,
            1,2,
            3,3,3,3,3,3,3,3,3,3,3,3,3,3,3, // lantanidos
            5,5,5,5,5,5,5,5,5,6,6,6,7,9,10,
            1,2,
            4,4,4,4,4,4,4,4,4,4,4,4,4,4,4, // actinidos
            5,5,5,5,5,5,5,5,5,5,5,5,5,9,10];
   
   var nombres=[" ","Alcalino","Alcalinotérreo","Lantánido","Actínido",
   "Metal de transición", "Metal del bloque p", "Metaloide", 
   "No metal", "Halógeno", "Gas noble"];
   return nombres[clasificacion[num]];
}

function getBloque(num){
    var bloque=" ss\
                sspppppp\
                sspppppp\
                ssddddddddddpppppp\
                ssddddddddddpppppp\
                ssddddddddddpppppp\
                ssffffffffffffffddddddddddpppppp\
                ssffffffffffffffddddddddddpppppp";
    return bloque[num];
}

var clasif={"Alcalino":"alcalino",
    "Alcalinotérreo":"alcalinoterreo",
    "Lantánido":"lantanido",
    "Actínido":"actinido",
    "Metal de transición":"metalTransicion",
    "Metal del bloque p":"metalBloqueP",
    "Metaloide":"metaloide",
    "No metal":"noMetal",
    "Halógeno":"halogeno",
    "Gas noble":"gasNoble"
};

var keys={
    PAGE_UP : 33,
    PAGE_DOWN : 34,
    END : 35,
    HOME : 36,
    ARROW_LEFT : 37,
    ARROW_UP : 38,
    ARROW_RIGHT : 39,
    ARROW_DOWN : 40,
}

function unfocus(z){
    //console.log("unfocus"+z)
    el=document.getElementById("el"+z).parentNode;
    if (el) {
        el.style.borderColor="#000000";
        el.style.borderWidth="3px";
        el.style.padding = "3px"
        el.tabIndex=0;
        el.setAttribute("aria-selected","false");
    }
}

function focus(z){
    //console.log("focus"+z)
    el=document.getElementById("el"+z).parentNode;
    if (el) {
        el.style.borderColor="#ff0000";
        el.style.borderWidth="5px";
        el.style.padding = "1px"
        el.tabIndex=1;
        el.setAttribute("aria-selected","true");
        el.focus();
        el.scrollIntoView();
        console.log(document.body.scrollLeft,el.offsetLeft)
        var scrollLeft = el.offsetLeft
        if (scrollLeft<200){
            scrollLeft=10
        }
        document.body.scrollLeft=scrollLeft;
    }
}
