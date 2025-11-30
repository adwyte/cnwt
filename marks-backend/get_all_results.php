<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


require "db.php";

$students = [];

$sres = $conn->query("SELECT * FROM students ORDER BY id DESC");

while ($stu = $sres->fetch_assoc()) {

  $sid = $stu["id"];
  $marks = [];
  $total = 0;

  $mres = $conn->query("SELECT * FROM subject_marks WHERE student_id=$sid");

  while ($row = $mres->fetch_assoc()) {
    $marks[] = $row;
    $total += $row["final"];
  }

  $avg = count($marks) ? round($total / count($marks), 2) : 0;

  $students[] = [
    "id" => $sid,
    "name" => $stu["name"],
    "roll" => $stu["roll"],
    "average" => $avg,
    "total" => $total,
    "subjects" => $marks
  ];
}

echo json_encode($students);
?>
