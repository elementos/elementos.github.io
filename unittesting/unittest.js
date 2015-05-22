/*test("Test grupo", function() {
equal(getGrupo(5), 13, "el grupo del elemento boro es 13");
equal(getGrupo(5), 13, "el grupo del elemento boro es 13");
equal(getGrupo(57), 3, "el grupo del elemento lantano es 3");
equal(getGrupo(65), 3, "el grupo del elemento terbio es 3");
equal(getGrupo(113), 13, "el grupo del elemento ununtrio es 13");
});

test("Test periodo", function() {
equal(getPeriodo(5), 2, "el periodo del elemento boro es 2");
equal(getPeriodo(16), 3, "el periodo del elemento azufre es 3");
equal(getPeriodo(57), 6, "el periodo del elemento lantano es 6");
equal(getPeriodo(103), 7, "el periodo del elemento lawrencio es 7");
equal(getPeriodo(72), 6, "el periodo del elemento hafnio es 6");	
});
*/
test("Test clasificacion", function() {
equal(getClasificacion(5), "Metaloide", "la clasificacion del elemento boro es metaloide");
equal(getClasificacion(16), "No metal", "la clasificacion del elemento azufre es no metal");
equal(getClasificacion(57), "Lantánido", "la clasificacion del elemento lantano es lantanido");
equal(getClasificacion(103), "Actínido", "la clasificacion del elemento lawrencio es actinido");
equal(getClasificacion(86), "Gas noble", "la clasificacion del elemento hafnio es metal de transicion");	
});
