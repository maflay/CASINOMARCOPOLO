<?php
// proxy.php

// Configuración
$apiKey = 'cceddfe7ed800d9d2230d9adb5aa7d02282757e0179e14a99153835ed4bbf0d6';
$query = isset($_GET['q']) ? urlencode($_GET['q']) : 'peñarol vs';

$url = "https://serpapi.com/search.json?q=$query&api_key=$apiKey";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Si la respuesta NO es JSON, devolver error
if ($httpCode !== 200 || stripos($response, "<!DOCTYPE") !== false) {
  header("Content-Type: application/json");
  http_response_code(500);
  echo json_encode(["error" => "La respuesta no es JSON. Código HTTP: $httpCode"]);
  exit;
}

// Permitir acceso CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
echo $response;
