const tabla= document.getElementById("tablero");
const btn_puntaje = document.getElementById("btn-puntaje");
const btn_nivel = document.getElementById("btn-nivel");
let dificultad=0;
const matriz=[]; 
matriz[0]=[0,0]; 
function crearTablero(filas, minas)
{
    matriz[0]=[0,0]; 
    for(let x=0; x<filas; x++)
    {
         matriz[x]=[0,0];
    }; 
    let i=0;
    let ii=0;

    class Casilla 
    {
        constructor (tieneMina,minasCerca, tienebandera){
            this.tieneMina=tieneMina;
            this.minasCerca=minasCerca;
            this.tienebandera=tienebandera;
        };
    };
    let linea="";
    //linea += "<br><table id='tablero' border='1'>";
    while(i<filas)
    {
        linea+="<tr>";
        ii=0;
        while(ii<filas)
        {
           matriz[i][ii]= new Casilla (false, 0, false);
         
            ii++;
         
            linea+="<td id='"+i+ii+"'>+</td>"
        }
        linea+="</tr>";
   
        i++;
    }
     linea += "</table>";
     tabla.innerHTML = linea;
}
function bombas(cantidad, filas, matriz)
{
    var ejex; 
   var ejey; 
    for(let x=0; x<cantidad; x++)
    {
        do{
           ejex=(Math.round((Math.random()*10)))%filas; 
           ejey= (Math.round((Math.random()*10)))%filas; 
        
        }while(matriz[ejex][ejey].tieneMina==true);
        matriz[ejex][ejey].tieneMina=true;
    }
  
}; 
function asigNum (){
    ejex=0;
    ejey=0;

}
function limpiar(){
    //abrir casillas
}

btn_nivel.addEventListener("click", (evento) =>{
    dificultad = evento.target.id; 
    
    if(dificultad == "f")
    {

        crearTablero(8); 

    }
        
    if(dificultad == "m")
    {
        crearTablero(16); 
    }
        

    if(dificultad == "d")
    {
        crearTablero(24); 
    }
        

    btn_nivel.style.display="none"; 
});
var click=0;
var ganaste=0;
tabla.addEventListener("click", (evento)=>
{
    if(ganaste==1)
    {
        alert("ganaste");
        //redirijirte a registr
    }
    console.log(evento);
    cuadid=evento.target.id;
    click++;
    var fila=0;
    var col=0;
    if(click=1)
    {
        if(dificultad == "f") 
        {
            var filas=8;
            var bombas1=10;
            bombas(10, 8, matriz); 
            fila=cuadid/10;
            fila=Math.floor(fila);
             col=cuadid%10;
        }
            
        if(dificultad == "m") 
        {
            const  filas1=10;
            const bombas1=40;
             bombas(40,10, matriz); 
        }
            
    
        if(dificultad == "d")
        {
            const  filas1=24;
            const bombas1=90;
             bombas(90, 24, matriz); 
        }
           
      asigNum();
    }
  
    console.log(matriz[fila][col]);
    if(matriz[fila][col].tieneMina==true)
    {
        alert("Perdiste :((");
        //redirijirte a inicio
    }
    else{
        limpiar();
    }
    if(click== (filas*filas)-bombas1){
        ganaste=1;
    }
 
    
});
tabla.addEventListener('contextmenu', (evento)=>{
    evento.target.style.color="red";
    evento.target.tienebandera=true;
    
});