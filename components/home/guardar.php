<?php
$conexion = new mysqli("localhost", "root", "", "marcopolo");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$correo = $_POST['correo'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$acepto_datos = isset($_POST['acepto_datos']) ? 1 : 0;
$fecha = date('Y-m-d H:i:s'); // Fecha y hora actual

$sql = "INSERT INTO usuarios_supercash (correo, telefono, acepto_datos, fecha_creacion) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssis", $correo, $telefono, $acepto_datos, $fecha);

if ($stmt->execute()) {
    echo "Datos guardados con éxito.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
