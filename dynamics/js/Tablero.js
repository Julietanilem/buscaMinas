const div =document.getElementById("tablero");

function crearTablero(filas, minas){
    let  tablero =[];
    let fila=[];
    let i=0;
    let ii=0;
    let col=0;
    let fil=0;
    class Casilla {
        constructor (tieneMina,minasCerca, tienebandera){
            this.tieneMina=tieneMina;
            this.minasCerca=minasCerca;
            this.tienebandera=tienebandera;
        };
    };
    while(i<filas)
    {
        while(ii<filas)
        {
           fila[ii]= new Casilla (false, 0, false);
            ii++;
            fil++;

            div.innerHTML+="<div id='"+col+fil+"'>Holaaaaaa</div>";
        }
        col++;

        i++;
    }

}

crearTablero(8, 10);