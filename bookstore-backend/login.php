<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$email || !$password) {
    echo json_encode(["error" => "missing fields"]);
    exit();
}

$stmt = $conn->prepare("SELECT id,name,password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 0) {
    echo json_encode(["error" => "user not found"]);
    exit();
}

$stmt->bind_result($id, $name, $hash);
$stmt->fetch();

if (!password_verify($password, $hash)) {
    echo json_encode(["error" => "wrong password"]);
    exit();
}

echo json_encode([
    "status" => "ok",
    "user" => [
        "id" => $id,
        "name" => $name,
        "email" => $email
    ]
]);
?>
