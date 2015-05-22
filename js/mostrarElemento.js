function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function(){
    var back=getParameterByName("back");
    var linkBack=document.getElementById("linkBack");
    linkBack.href=back;
    
    var z=getParameterByName("z");
    function getAtr(atr,unit){
        var res=jsonTable[z][atr];
        if (res=="" || res=="n/a" || res=="-") {
            res="no se conoce / no aplica";
        }
        else if (unit){
            res=(res+" "+unit);
        }
        return (res);
    }
    if (z && z>0 && z<=jsonTable.length) {
        var tab=document.getElementById("table");
        
        var div=document.createElement("div");
        div.innerHTML=("Nombre: "+getAtr("name"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Símbolo: "+getAtr("symbol"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Número atómico: "+getAtr("atomic_number"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Clasificación: "+getClasificacion(getAtr("atomic_number")));
        tab.appendChild(div);

        div=document.createElement("div");
        div.innerHTML=("Grupo: "+getGrupo(getAtr("atomic_number")));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Periodo: "+getPeriodo(getAtr("atomic_number")));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Bloque: "+getBloque(getAtr("atomic_number")));
        tab.appendChild(div);

        div=document.createElement("div");
        div.innerHTML=("Masa atómica: "+getAtr("atomic_weight"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Estados de oxidación: "+getAtr("oxidation_states"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Configuración electrónica: "+getAtr("electronic_configuration"));
        tab.appendChild(div);
        
        p=document.createElement("p");
        p.innerHTML=("Otros datos: ");
        tab.appendChild(p);
        
        div=document.createElement("div");
        div.innerHTML=("Densidad: " + getAtr("density g/cm","gramos por centímetro cúbico")) ;
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Punto de fusión: "+getAtr("melting_point K","grados Kelvin"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Punto de ebullición: "+getAtr("boiling_point K","grados Kelvin"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Radio atómico: "+getAtr("atomic_radius pm","picometros"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Radio covalente: "+getAtr("covalent_radius pm","picometros"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Radio iónico: "+getAtr("ionic_radius pm", "picometros"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Volumen atómico: "+getAtr("atomic_volume cm3/mol", "centimetros cúbicos por mol"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Calor específico: "+getAtr("specific_heat (@20°C J/g mol)", "Joules por gramo mol a 20 grados Celsius"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Calor de fusión: "+getAtr("fusion_heat (kJ/mol)", "kiloJoules por mol"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Calor de evaporación: "+getAtr("evaporation_heat (kJ/mol)", "kiloJoules por mol"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Conductividad térmica: "+getAtr("thermal_conductivity (@25°C W/m K) ", "Watts por metro Kelvin a 25 grados Celsius"));
        tab.appendChild(div);        
        
        div=document.createElement("div");
        div.innerHTML=("Negatividad de Pauling: "+getAtr("pauling_negativity"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Primera ionización: "+getAtr("first_ionizing kJ/mol","kiloJoules por mol"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Estructura cristalina: "+getAtr("lattice_structure"));
        tab.appendChild(div);
        
        div=document.createElement("div");
        div.innerHTML=("Parámetro de red: "+getAtr("lattice_constant ang","Angstrom"));
        tab.appendChild(div);
    }
});