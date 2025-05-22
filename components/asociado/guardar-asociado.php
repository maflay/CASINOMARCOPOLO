<?php
require_once("../../conexion.php");

if ($conexion->connect_error) {
    http_response_code(500);
    echo "Error de conexión: " . $conexion->connect_error;
    exit;
}

$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$ciudad = $_POST['ciudad'] ?? '';

if (!$nombre || !$email || !$telefono || !$direccion || !$ciudad) {
    http_response_code(400);
    echo "Faltan datos obligatorios.";
    exit;
}

$stmt = $conexion->prepare("INSERT INTO usuarios_asociado (Nombre, Email, Telefono, Direccion, Ciudad) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nombre, $email, $telefono, $direccion, $ciudad);

if ($stmt->execute()) {
    echo "Datos guardados correctamente.";
} else {
    http_response_code(500);
    echo "Error al guardar los datos.";
}

$conexion->close();
?>
