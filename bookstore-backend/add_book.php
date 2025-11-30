<?php
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$title = trim($data["title"] ?? "");
$author = trim($data["author"] ?? "");
$price = trim($data["price"] ?? "");
$desc = trim($data["description"] ?? "");

if (!$title || !$author || !$price) {
    echo json_encode(["error" => "missing fields"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO books (title,author,price,description) VALUES (?,?,?,?)");
$stmt->bind_param("ssds", $title, $author, $price, $desc);
$stmt->execute();

echo json_encode(["status" => "ok", "book_id" => $stmt->insert_id]);
?>
