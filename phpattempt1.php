<!DOCTYPE html>
<html>
<body>

<?php
$servername = "localhost";
$first_name = "firstname";
$last_name = "lastname";
$dbname = "userinfo";

// Create connection
$conn = new mysqli($servername, $first_name, $last_name, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT ID, FIRST_NAME, LAST_NAME FROM USERINFO";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<br> id: ". $row["id"]. " - Name: ". $row["first_name"]. " " . $row["last_name"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?> 

</body>
</html>(edited)