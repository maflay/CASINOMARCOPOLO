<?php
$apiKey = 'cceddfe7ed800d9d2230d9adb5aa7d02282757e0179e14a99153835ed4bbf0d6';
$query = isset($_GET['q']) ? $_GET['q'] : 'real madrid vs';
$url = "https://serpapi.com/search.json?q=" . urlencode($query) . "&api_key=$apiKey";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Verificar si es JSON válido
json_decode($response);
if ($httpCode !== 200 || json_last_error() !== JSON_ERROR_NONE) {
  header("Content-Type: application/json");
  http_response_code(500);
  echo json_encode(["error" => "La respuesta no es JSON válida. Código HTTP: $httpCode"]);
  exit;
}

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

echo $response;
