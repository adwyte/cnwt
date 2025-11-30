<?php
// get_book.php?id=123
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require "db.php";

$id = intval($_GET['id'] ?? 0);
if ($id<=0) { echo json_encode(["error"=>"invalid id"]); exit; }

$stmt = $conn->prepare("SELECT * FROM books WHERE id=?");
$stmt->bind_param("i",$id);
$stmt->execute();
$res = $stmt->get_result();
$book = $res->fetch_assoc();
echo json_encode($book ?? []);
?>
