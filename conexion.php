<?php
$host = "localhost";
$usuario = "root";
$clave = ""; // sin contraseña por defecto en Laragon
$bd = "marcopolo";

$conexion = new mysqli($host, $usuario, $clave, $bd);

if ($conexion->connect_error) {
    die("Error al conectar: " . $conexion->connect_error);
}
// echo "Conexión exitosa"; // Puedes descomentar para probar
?>
