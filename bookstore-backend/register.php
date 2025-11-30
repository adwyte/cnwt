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

if (!$data) {
    echo json_encode(["error" => "Invalid JSON", "raw" => $raw]);
    exit();
}

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if (!$name || !$email || !$password) {
    echo json_encode(["error" => "missing fields"]);
    exit();
}

// check if exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["error" => "email exists"]);
    exit();
}
$stmt->close();

// insert
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (name,email,password) VALUES (?,?,?)");
$stmt->bind_param("sss", $name, $email, $hash);
$stmt->execute();

echo json_encode([
    "status" => "ok",
    "user_id" => $stmt->insert_id
]);

$stmt->close();
?>
