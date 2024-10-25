<?php
require_once 'db_connection.php';

// Verificar la conexión
if (!$con) {
    http_response_code(500); 
    die("Conexión fallida - ERROR de Conexión: No se pudo conectar a la base de datos");
}

// Establecer las cabeceras para indicar que el contenido es JSON
header('Content-Type: application/json');

// Obtener todas las PCs
function getPcs() {
    global $con;
    $sql = "SELECT * FROM computadoras";
    $result = $con->query($sql);

    if ($result === false) {
        http_response_code(500);
        die(json_encode(array("error" => "Error al obtener PCs: " . $con->error)));
    }

    $pcs = array();
    while ($row = $result->fetch_assoc()) {
        $pcs[] = $row;
    }

    if (empty($pcs)) {
        http_response_code(404);
        echo json_encode(array("message" => "No se encontraron PCs"));
    } else {
        // Devolver los datos en formato JSON
        echo json_encode($pcs);
    }
}

// Manejar solicitudes
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getPcs();
} else {
    http_response_code(405);
}
?>
