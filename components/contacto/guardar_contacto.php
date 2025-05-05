<?php
// Conexión a la base de datos (ajusta los valores a tu entorno)
$conexion = new mysqli("localhost", "root", "", "marcopolo");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'] ?? '';
$correo = $_POST['correo'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$ciudad = $_POST['ciudad'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$fecha_solicitud = $_POST['fecha_solicitud'] ?? null;
$descripcion = $_POST['descripcion'] ?? '';
$es_cliente = isset($_POST['es_cliente']) ? 1 : 0;
$acepto_terminos = isset($_POST['acepto_terminos']) ? 1 : 0;
$fecha = date('Y-m-d H:i:s'); // Fecha y hora actual

// Validación básica
if (empty($nombre) || empty($correo) || empty($descripcion) || !$acepto_terminos) {
    echo "Faltan datos obligatorios o no aceptaste los términos.";
    exit;
}

// Preparar e insertar
$sql = "INSERT INTO usuarios_contactanos  
(nombre, correo, telefono, ciudad, direccion, fecha_solicitud, descripcion, es_cliente, acepto_terminos, fecha_registro)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("sssssssiis", $nombre, $correo, $telefono, $ciudad, $direccion, $fecha_solicitud, $descripcion, $es_cliente, $acepto_terminos, $fecha);

if ($stmt->execute()) {
    echo "Registro guardado con éxito.";
} else {
    echo "Error al guardar: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
