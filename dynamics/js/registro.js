const nom1 = document.getElementById("nombre1");
const nom2 = document.getElementById("nombre2");
const guardar = document.getElementById("btn-guardar");
const form = document.getElementById("formulario");
const formDentro = document.getElementById("inForm");
const linear = document.createElement("span");
var cookie=document.cookie.split(';');
var i=-1;
var index;
var index2;


formDentro.appendChild(linear);
nom1.addEventListener("keyup", ()=>{
    if(nom1.value==nom2.value)
    {
        guardar.disabled=false;
        document.cookie="NombreJugador="+nom1.value;
    }
    else{
        guardar.disabled=true;
    }
}
);
nom2.addEventListener("keyup", ()=>{
    if(nom1.value==nom2.value)
    {
        guardar.disabled=false;
        document.cookie="NombreJugador="+nom1.value;
    }
    else{
        guardar.disabled=true;
    }

});
nom2.addEventListener("change", ()=>{
    if(nom1.value==nom2.value)
    {
        guardar.disabled=false;
        document.cookie="NombreJugador="+nom1.value;
    }
    else{
        guardar.disabled=true;
    }

});
nom1.addEventListener("change", ()=>{
    if(nom1.value==nom2.value)
    {
        guardar.disabled=false;
        document.cookie="NombreJugador="+nom1.value;
    }
    else{
        guardar.disabled=true;
    }

});
cookie.forEach((valor)=>{
    i++;
    if(valor.includes("Tiempo"))
    {
        index=i;
    }
    if(valor.includes("NombreJugador"))
    {
        index2=i;
    }
   
});
linear.innerHTML="<br>Tu puntaje es: "+cookie[index];
var x=cookie[index2].split('=');
if(x[1]!="undefined" )
{
    nom1.value=x[1];
}
else{
    nom1.value=" ";
}