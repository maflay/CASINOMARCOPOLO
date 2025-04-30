<?php
$conexion = new mysqli("localhost", "root", "", "marcopolo");

if ($conexion->connect_error) {
    http_response_code(500);
    echo "Error de conexión: " . $conexion->connect_error;
    exit;
}

$nombre = $_POST['nombre'] ?? '';
$correo = $_POST['correo'] ?? '';
$contraseña = $_POST['contraseña'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$fecha_nacimiento = $_POST['fecha'] ?? '';

if (empty($nombre) || empty($correo) || empty($contraseña) || empty($fecha_nacimiento)) {
    http_response_code(400);
    echo "Todos los campos son obligatorios.";
    exit;
}

$contraseña_hash = password_hash($contraseña, PASSWORD_BCRYPT);

$sql = "INSERT INTO usuarios_registro (Nombre, Correo, Direccion, Telefono, Contraseña, Fecha_nacimiento, Fecha_creacion)
        VALUES (?, ?, ?, ?, ?, ?,NOW())";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssssss", $nombre, $correo, $direccion ,$telefono,$contraseña_hash, $fecha_nacimiento);

if ($stmt->execute()) {
    echo "Registro exitoso.";
} else {
    http_response_code(500);
    echo "Error al registrar: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
