<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bdlab";

// Crear conexión
$con = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($con->connect_error) {
    die("Conexión fallida - ERROR de Conexión: " . $con->connect_error);
}
echo "Conexión exitosa";
?>
