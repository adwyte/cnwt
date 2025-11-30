<?php
$host = "localhost";
$user = "root";   // XAMPP default
$pass = "";
$db = "marksdb";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  die(json_encode(["error" => "DB Connection failed"]));
}
?>
