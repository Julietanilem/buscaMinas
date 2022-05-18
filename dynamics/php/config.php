<?php

    define ("DBHOST", "localhost");
    define ("DBUSER", "root");  
    define ("PASSWORD", ""); 
    define ("DB", "buscaminas" ); 

    function connect(){
        $conexion = mysqli_connect(DBHOST, DBUSER, PASSWORD, DB); 
        //var_dump($conexion); 
        if(!$conexion){
            mysqli_error(); 
            echo "No se pudo conectar a la base"; 
        }
        return $conexion; 
    }

    $con = connect(); //tienen que salir caracteres
?>