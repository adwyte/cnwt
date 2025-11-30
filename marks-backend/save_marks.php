<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


require "db.php";


$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$roll = $data["roll"];
$marks = $data["marks"];

$conn->query("INSERT INTO students (name, roll) VALUES ('$name', '$roll')");
$student_id = $conn->insert_id;

foreach ($marks as $m) {
  $subject = $m["subject"];
  $mse = $m["mse"];
  $ese = $m["ese"];
  $final = round(($mse * 0.3 + $ese * 0.7), 2);

  $conn->query(
    "INSERT INTO subject_marks (student_id, subject, mse, ese, final)
     VALUES ($student_id, '$subject', $mse, $ese, $final)"
  );
}

echo json_encode(["status" => "saved", "student_id" => $student_id]);
?>
