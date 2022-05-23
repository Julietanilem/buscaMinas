const tabla= document.getElementById("tablero");
const btn_puntaje = document.getElementById("btn-puntaje");
const btn_nivel = document.getElementById("btn-nivel");
const btn_intenta = document.getElementById("IntentaDeNuevo");
const btn_registrate = document.getElementById("registrar");
const audioExplo= new Audio ("./statics/audio/explosion.mp3");
let dificultad=0;
const matriz=[]; 
matriz[0]=[0,0];
var click=true;
var volteados=0;
var ganaste=0; 
var filas;
var suma;
var perdiste=0;
var casillaVolteada=0;
var inicio=0;
var dificultad2=0;
var llamadas=0;
function crearTablero(filas)
{
    casillaVolteada=0;
    matriz[0]=[0,0]; 
    for(let x=0; x<filas; x++)
    {
         matriz[x]=[0,0];
    }; 
    let i=0;
    let ii=0;

    class Casilla 
    {
        constructor (tieneMina,minasCerca, tienebandera, volteado, ident, i, ii, id_completo){
            this.tieneMina=tieneMina;
            this.minasCerca=minasCerca;
            this.tienebandera=tienebandera;
            this.volteado=volteado;
            this.ident=ident;
            this.fila=i;
            this.columna=ii;
            this.id_completo=id_completo;
        };
        cambiar(){
            
        };
    };
    let linea="";
  
    linea += "<br><table border='1'>";
    while(i<filas)
    {
        linea+="<tr>";
        ii=0;
        while(ii<filas)
        {
            if((i<10 && ii<10) || (i>9 && ii>9))
            {
                matriz[i][ii]= new Casilla (false, 0, false, false, i+''+ii, i, ii, i+''+ii+'');
                linea+="<td class='casillita' id='"+i+''+ii+''+"'></td>"
            }
            else{
                if(i<=9 && ii>9)
                {
                    matriz[i][ii]= new Casilla (false, 0, false, false, i+''+ii, i, ii, i+''+ii+'00');
                    linea+="<td class='casillita' id='"+i+''+ii+'00'+"'></td>"
                    
                }
                else if(i>9 && ii<=9)
                {
                    matriz[i][ii]= new Casilla (false, 0, false, false, i+''+ii,i, ii,i+''+ii+'01' );
                    linea+="<td class='casillita' id='"+i+''+ii+'01'+"'></td>"
                }
                else{
                    console.log("Caso no considerado. ");
                }
            
            }
     
            
    
            ii++;

        }
        linea+="</tr>";
   
        i++;
    }
     linea += "</table>";
     tabla.innerHTML = linea;
}
function bombas(cantidad, filas, matriz, fila, col)
{
    var ejex; 
   var ejey; 
    for(let x=0; x<cantidad; x++)
    {
        do{
           ejex=(Math.round((Math.random()*100)))%filas; 
           ejey= (Math.round((Math.random()*100)))%filas; 
        
        }while(matriz[ejex][ejey].tieneMina==true && (fila!=ejey && col!=ejex));
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
      
            

           suma=0;
            ejey++;
       }
        ejex++;
   }   
   

}
function voltear(fila, col, matriz, filas)
{
    for (let c=0;c<filas; c++)
    {   
        
        for(let a=0;a<filas;a++)
        {
            if(matriz[c][a].volteado==true)
            {
                tabla.children[1].children[c].children[a].innerHTML=matriz[c][a].minasCerca;

            
                tabla.children[1].children[c].children[a].  setAttribute("style", "background-color:pink" );
                casillaVolteada++;
            }
            
        }
        a=0;
    }  
}
function verBombas(filas){
   // console.log(tabla.children[1].children[3].children[0]);

    for (let c=0;c<filas; c++)
    {   
        a=0;
        for(let a=0;a<filas;a++)
        {
            if(matriz[c][a].tieneMina==true)
            {
                tabla.children[1].children[c].children[a].innerHTML="<img src='./statics/img/mina.jpg' id='img'/ >";
            }
            
        }
    }
}
function limpiar(matriz, fila, col, filas=dificultad2){

		if(matriz[fila][col].minasCerca==0)
        {
            for(let x=-1;x<2;x++)
            {
                var fila2=fila+x;
                var y=-1;
              
                for(y=-1;y<2;y++)
                {
                   
                
                    var column2=col+y;
                   if(column2<filas && fila2<filas && column2>=0 && fila2>=0)
                   {
                       console.log(fila2+" "+column2);
                        matriz[fila2][column2].volteado=true;
                        
                        console.log( matriz[fila2][column2]);
                       if(llamadas<100)
                       {
                           if(matriz[fila2][column2].minasCerca==0)
                            {
                             
                                llamadas++;
                                limpiar(matriz,fila2, column2);
                                
                            }
                       }
                       
                   }
                    
                    
                    
                }
            }
            
            
            
        }
		voltear(fila2, column2, matriz, filas);
}

btn_nivel.addEventListener("click", (evento) =>{
    dificultad = evento.target.id; 
  
    if(dificultad == "f")
    {

        crearTablero(8); 
        dificultad2=8;
    }
        
    if(dificultad == "m")
    {
        crearTablero(16); 
        dificultad2=16;
    }
        

    if(dificultad == "d")
    {
        crearTablero(24); 
        dificultad2=24;
    }
        

    btn_nivel.style.display="none"; 
});


tabla.addEventListener("click", (evento)=>
{
    
    if(perdiste!=1 && ganaste!=1)
    {
        if(evento.target.id!="tablero")
        {
             inicio = new Date();
     
            if(ganaste==1)
            {
                alert("ganaste");
                btn_registrate.style.display="block";
                fin = new Date();
               var  tiempoTotal= (fin.getTime() - inicio.getTime())/1000;
                //cokie del total
         
                co=document.cookie = "Tiempo="+tiempoTotal;
                console.log(co);
                verBombas(filas);
            }
            cuadid=evento.target.id;
        
            if(dificultad == "f"  ) 
            {
                fila=cuadid/10;
                fila=Math.floor(fila);
                col=cuadid%10;
                var filas=8;
                var bombas1=10;
            }
        
            if(dificultad == "d")
            {
                var filas=24;
                var bombas1=99;
            }
            if(dificultad == "m")
            {
                var filas=16;
                var bombas1=40;
            }
            if(dificultad == "d" || dificultad == "m" ) 
            {
        
                if(cuadid<100)
                {
                    fila=cuadid/10;
                    fila=Math.floor(fila);
                    col=cuadid%10;
                    
                }
                else if (cuadid<10000){
                    fila=cuadid/100;
                    fila=Math.floor(fila);
                    col=cuadid%100;
                
                }
                else if(cuadid<100000)
                {
                
                    if(cuadid%10==0)
                    {
                        cuadid/=100;
                        cuadid=Math.floor(cuadid);

                        fila=cuadid/100;
                        fila=Math.floor(fila);
                        col=cuadid%100;
                    }
                    else if(cuadid%10==1)
                    {
                        cuadid/=100;
                        cuadid=Math.floor(cuadid);


                        fila=cuadid/10;
                        fila=Math.floor(fila);
                        col=cuadid%10;
                    }
                

                if(matriz[fila][col].volteado==false)
                {
                    evento.target.id=cuadid;
                

                }
                
                
                }
            }
            
     
            if(click==true)
            {
                if(dificultad == "f") 
                {
                
                    bombas(10, 8, matriz, fila, col); 
            
                }
                    
                if(dificultad == "m") 
                {
                    
                    bombas(40,16, matriz, fila, col); 
                }
                    
            
                if(dificultad == "d")
                {
                
                    bombas(99, 24, matriz, fila, col); 
                }
                
            asigNum(matriz, filas);
            
            }
    
            if(matriz[fila][col].tieneMina==true && click==false)
                {
                    evento.target.innerHTML="<img src='./statics/img/mina.jpg' id='img'/ >"
                    audioExplo.play();
                    audioExplo.volume=0.4;
                    
                    alert("Perdiste :((");
                    verBombas(filas);
                    perdiste=1;
                    if(perdiste==1)
                        {
                            
                            btn_intenta.style.display="block";
                            btn_intenta.addEventListener("click", ()=>{
                                perdiste=0;
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
                                btn_intenta.style.display="none";     
                                click=true; 

                            });
                    }
                
                }
            else{
                evento.target.innerHTML=matriz[fila][col].minasCerca;
                matriz[fila][col].volteado=true;
                evento.target.setAttribute("style", "background-color:pink" );
                casillaVolteada++;
                llamadas=0;
                if(matriz[fila][col].minasCerca==0)
                {
                    limpiar(matriz, fila, col, filas);
                }
                
            }
            if(casillaVolteada== (filas*filas)-bombas1){
                ganaste=1;     
            }
            click=false;
        }
    
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

