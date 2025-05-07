<?php
$modo = "local"; // Cambia a "local" si estás en Laragon o XAMPP o "remoto"

if ($modo === "local") {
    $host = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "marcopolo";
} else {
    $host = "sql108.iceiy.com";
    $usuario = "icei_38915950";
    $clave = "Casino1234";
    $bd = "icei_38915950_marcopolo";
}

$conexion = new mysqli($host, $usuario, $clave, $bd);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
