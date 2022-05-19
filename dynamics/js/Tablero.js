const tabla= document.getElementById("tablero");
const btn_puntaje = document.getElementById("btn-puntaje");
const btn_nivel = document.getElementById("btn-nivel");
const audioExplo= new Audio ("./statics/media/audio/vanish_1.mp3");
let dificultad=0;
const matriz=[]; 
matriz[0]=[0,0];
var click=true;
var ganaste=0; 
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
        constructor (tieneMina,minasCerca, tienebandera, volteado, ident, i, ii){
            this.tieneMina=tieneMina;
            this.minasCerca=minasCerca;
            this.tienebandera=tienebandera;
            this.volteado=volteado;
            this.ident=ident;
            this.i=i;
            this.ii=ii;
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
            linea+="<td class='casillita' id='"+i+ii+"'></td>"
            var pal=i.toString();
            var z=ii.toString();
            var q=pal+z;

            matriz[i][ii]= new Casilla (false, 0, false, false, q, i, ii);
            ii++;
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
function asigNum (matriz, filas){
    var ejex=0;
    var ejey=0;
    var  suma=0;
   while(ejex<filas)
   {
       ejey=0;
       suma=0;
       while(ejey<filas)
       {
           suma=0;
            if(ejex-1>=0)
            {
                if(matriz[ejex-1][ejey].tieneMina==true)
                {
                    suma++;
                }
                if(ejey-1>=0)
                {
                    if(matriz[ejex-1][ejey-1].tieneMina==true)
                    {
                        suma++;
                    } 
                }
                if(ejey+1<filas)
                {
                    if(matriz[ejex-1][ejey+1].tieneMina==true)
                    {
                        suma++;
                    }
                }
                
            }
            if(ejex+1<filas){
                if(matriz[ejex+1][ejey].tieneMina==true)
                {
                    suma++;
                }
                if(ejey-1>=0)
                {
                    if(matriz[ejex+1][ejey-1].tieneMina==true)
                    {
                        suma++;
                    }
                }
                if(ejey+1<filas)
                {
                  if(matriz[ejex+1][ejey+1].tieneMina==true)
                    {
                        suma++;
                    }  
                }
                
            }

            if(ejey-1>=0)
            {
                if(matriz[ejex][ejey-1].tieneMina==true)
                {
                    suma++;
                }
            }
            if(ejey+1<filas)
            {
                if(matriz[ejex][ejey+1].tieneMina==true)
                {
                    suma++;
                }
            }
            matriz[ejex][ejey].minasCerca=suma;
           // console.log(matriz[ejex][ejey]);
           suma=0;
            ejey++;
       }
        ejex++;
   }
       
   

}
function limpiar(matriz, target, fila, col){
    
}

btn_nivel.addEventListener("click", (evento) =>{
    dificultad = evento.target.id; 
    console.log(evento.target);
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
var volteados;
tabla.addEventListener("click", (evento)=>
{
    if(evento.target.id!="tablero")
    {
        if(ganaste==1)
        {
            alert("ganaste");
            //redirijirte a registr
        }
        cuadid=evento.target.id;
        
        var fila=0;
        var col=0;
        if(dificultad == "f"  ) 
        {
            fila=cuadid/10;
            fila=Math.floor(fila);
            col=cuadid%10;
            var filas=8;
            var bombas1=10;
        }
        console.log(cuadid);
        if(dificultad == "d" || dificultad == "m" ) 
        {
            if(cuadid<100)
            {
                fila=cuadid/10;
                fila=Math.floor(fila);
                col=cuadid%10;
                var filas=24;
                var bombas1=40;
            }
            else if (cuadid<1000){
                fila=cuadid/100;
                fila=Math.floor(fila);
                col=cuadid%10;
                var filas=10;
                var bombas1=40;
            }
            else if(cuadid<10000)
            {
                fila=cuadid/100;
                fila=Math.floor(fila);
                col=cuadid%100;
                const  filas=24;
                const bombas1=90;
            }
        }
        
        console.log(fila+" "+col);
        if(click==true)
        {
            if(dificultad == "f") 
            {
            
                bombas(10, 8, matriz); 
        
            }
                
            if(dificultad == "m") 
            {
                
                 bombas(40,16, matriz); 
            }
                
        
            if(dificultad == "d")
            {
               
                 bombas(90, 24, matriz); 
            }
               
          asigNum(matriz, filas);
        }
    
       
        if(matriz[fila][col].tieneMina==true && click==false)
            {
                evento.target.innerHTML="<img src='./statics/img/mina.jpg' id='img'/ >"
                audioExplo.addEventListener("ended", ()=>{
                        alert("Perdiste :((");
                });
               
                // window.location.href = "."
            }
        else{
            evento.target.innerHTML=matriz[fila][col].minasCerca;
            matriz[fila][col].volteado=true;
            evento.target.setAttribute("style", "background-color:pink" );
            volteados++;
            limpiar(matriz, evento.target.id, fila, col);
        }
        if(click== (filas*filas)-bombas1){
            ganaste=1;
        }
        click=false;

    }
   
   
    
});
tabla.addEventListener('contextmenu', (evento)=>{
    if(   evento.target.tienebandera==true)
    {
        evento.target.tienebandera=false;
        evento.target.setAttribute("style", "background-color:brown");
        evento.target.innerHTML=" "
    }
    else{
        evento.target.tienebandera=true;
        evento.target.setAttribute("style", "background-color:white");
        evento.target.innerHTML="<img src='./statics/img/bandera.png' id='img' >"
   
    }
     evento.preventDefault();
    
    
});
