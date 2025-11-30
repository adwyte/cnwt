<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


require "db.php";

$id = $_GET["id"];

$student_res = $conn->query("SELECT * FROM students WHERE id=$id");
$student = $student_res->fetch_assoc();

$marks = [];
$total = 0;

$mark_res = $conn->query("SELECT * FROM subject_marks WHERE student_id=$id");
while ($row = $mark_res->fetch_assoc()) {
  $marks[] = $row;
  $total += $row["final"];
}

$average = count($marks) ? round($total / count($marks), 2) : 0;

echo json_encode([
  "student"  => $student,
  "subjects" => $marks,
  "total"    => round($total, 2),
  "average"  => $average
]);
?>
