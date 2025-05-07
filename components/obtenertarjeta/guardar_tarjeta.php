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
$tipo_tarjeta = $_POST['tipo_tarjeta'] ?? '';

if (!$nombre || !$email || !$telefono || !$direccion || !$ciudad || !$tipo_tarjeta) {
    http_response_code(400);
    echo "Faltan datos.";
    exit;
}

$stmt = $conexion->prepare("INSERT INTO usuarios_tarjeta (Nombre, Email, Telefono, Direccion, Ciudad, Tipo_tarjeta) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssi", $nombre, $email, $telefono, $direccion, $ciudad, $tipo_tarjeta);

if ($stmt->execute()) {
    echo "Datos guardados correctamente.";
} else {
    http_response_code(500);
    echo "Error al guardar los datos.";
}

$conexion->close();
?>
