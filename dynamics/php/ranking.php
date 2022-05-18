
<?php
    include("./config.php"); 
    $conexion = connect(); 
    $usuario=(isset($_POST['nombre1']) && $_POST['nombre1'] != "")? $_POST['nombre1']: false;
    $puntaje=getdate();
    $segundos=8;
    $id_nivel=1;
    date_default_timezone_set('America/Mexico_City');
    $fecha=date('Y-m-d H:i:s');
    echo $usuario;
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
    $id_usuario=$datos['id_usuario'];
    $peticion= "INSERT INTO registro (id_usuario, id_nivel, segundos, fecha) VALUES ($id_usuario, $id_nivel, $segundos ,'$fecha' )";
    $query = mysqli_query( $conexion, $peticion); 
    $peticion= "SELECT * FROM registro";
    $query = mysqli_query( $conexion, $peticion); 
    $datos2=mysqli_fetch_array($query, MYSQLI_ASSOC);
    var_dump($datos2)
?>