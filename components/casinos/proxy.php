<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$equipo = isset($_GET['equipo']) ? urlencode($_GET['equipo']) : 'arsenal';

// Paso 1: Buscar ID del equipo
$searchUrl = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=$equipo";
$searchResult = file_get_contents($searchUrl);
$searchData = json_decode($searchResult, true);

if (!$searchData || !isset($searchData['teams'][0]['idTeam'])) {
    echo json_encode(["error" => "Equipo no encontrado"]);
    exit;
}

$idTeam = $searchData['teams'][0]['idTeam'];

// Paso 2: Obtener último partido
$lastUrl = "https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=$idTeam";
$lastResult = file_get_contents($lastUrl);
$lastData = json_decode($lastResult, true);

$lastMatch = $lastData['results'][0] ?? null;

// Paso 3: Obtener próximo partido
$nextUrl = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=$idTeam";
$nextResult = file_get_contents($nextUrl);
$nextData = json_decode($nextResult, true);

$nextMatch = $nextData['events'][0] ?? null;

echo json_encode([
    "equipo" => $equipo,
    "ultimo" => $lastMatch,
    "proximo" => $nextMatch
]);
