const nom1 = document.getElementById("nombre1");
const nom2 = document.getElementById("nombre2");
const guardar = document.getElementById("btn-guardar");
const form = document.getElementById("formulario");
nom1.addEventListener("keyup", ()=>{
    if(nom1.value==nom2.value)
    {
        guardar.disabled=false;
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
    }
    else{
        guardar.disabled=true;
    }

});
guardar.addEventListener("click", ()=>
{
    form.style.display="none";
    console.log("no");

});
