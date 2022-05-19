<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking</title>
    <link rel="stylesheet" href="../../statics/style/styles.css">

</head>
<body>
    <?php
        include("./config.php"); 
        $conexion = connect(); 
        $usuario=(isset($_POST['nombre1']) && $_POST['nombre1'] != "")? $_POST['nombre1']: false;
        $puntaje=getdate();
        $segundos=10;
        $id_nivel=1;
        date_default_timezone_set('America/Mexico_City');
        $fecha=date('Y-m-d H:i:s');
        $peticion= "SELECT *FROM usuario WHERE nombre='$usuario'";
        $query = mysqli_query( $conexion, $peticion); 
        $datos=mysqli_fetch_array($query, MYSQLI_ASSOC);
       
        if($datos==NULL)
        {
            $peticion= "INSERT INTO usuario (nombre) VALUES ('$usuario')";
            $query = mysqli_query( $conexion, $peticion); 
        }
    
        $peticion= "SELECT * FROM usuario WHERE nombre='$usuario'";
        $query = mysqli_query( $conexion, $peticion); 
        $datos2=mysqli_fetch_array($query, MYSQLI_ASSOC);
        $id_usuario=$datos2['id_usuario'];
        $peticion= "INSERT INTO registro (id_usuario, id_nivel, segundos, fecha) VALUES ($id_usuario, $id_nivel, $segundos ,'$fecha' )";
        $query = mysqli_query( $conexion, $peticion); 
        $peticion= "SELECT * FROM registro";
        $query = mysqli_query( $conexion, $peticion); 
        $datos2=mysqli_fetch_array($query, MYSQLI_ASSOC);

        
       
        $peticion= "SELECT * FROM registro";
        $query = mysqli_query( $conexion, $peticion); 
        $datos_usuario=mysqli_fetch_array($query, MYSQLI_ASSOC);

        $niveles = 1;
        while($niveles<=3)
        {
            switch($niveles){
                case 1:{
                    $nivel="Fácil";
                    break;
                }
                case 2:{
                    $nivel="Medio";
                    break;
                }
                case 3:{
                    $nivel="Difícil";
                    break;
                }
            }
            $peticion="SELECT * FROM registro WHERE ID_nivel=$niveles";
            $query = mysqli_query( $conexion, $peticion); 
            // $datos=mysqli_fetch_array($query, MYSQLI_ASSOC);
            $segundos=[];
            $ids=[];
            $fechas=[];

            $i=0;
            while($row=mysqli_fetch_array($query, MYSQLI_ASSOC)){
                $segundos[$i]=$row['segundos'];
                $ids[$i]=$row['id_usuario'];
                $fechas[$i]=$row['fecha'];
                $i++;
            }
            asort($segundos);
            $lugar=0;
            
            echo"<br><br><table border='1' id='tabla' align='center'y>
            <thead>
             <tr>
             <td colspan='4'>$nivel</td>
             </tr> 
             <tr>
                 <td>Lugar</td>
                 <td>Jugador</td>
                 <td>Tiempo para acabar</td>
                 <td>Fecha</td>
             </tr>
            </thead>
             <tbody>";
            if($ids != NULL)
            {
                foreach($segundos as $llave=>$valor)
                {
                    
                    $lugar++;
                    echo "<tr><td>$lugar</td>";
                    $nombre=$ids[$llave];
                    $peticion= "SELECT * FROM usuario WHERE id_usuario='$nombre'";
                    $query = mysqli_query( $conexion, $peticion); 
                    $datos2=mysqli_fetch_array($query, MYSQLI_ASSOC);
                    $nombre=$datos2['nombre'];
                    echo "<td>$nombre</td>
                    <td>$valor</td>
                    <td>$fechas[$llave]</td>  </tr>";
                }
            }
            else 
            {
                echo"<tr> <td colspan='4'>Todavía nadie se registra en este nivel :) </td></tr>"; 
            }
            echo "</tbody>
            
            </table>"; 
            $niveles++;
        } 
    ?>
     <form class="inicio" action="../../BuscaMinas.html" method="post">
            <button id="btn-regresar" type="submit" >Regresar al inicio</button>
    </form>
</body>
</html>