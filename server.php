<?php
function connectdb()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "files_db";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        return null;
    }
}

function insert_file($filename)
{
    $conn = connectdb();

    if ($conn) {
        try {
            $sql = "INSERT INTO tbl_files (files) VALUES (:filename)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':filename', $filename);
            $stmt->execute();
            echo "File inserted successfully.";
        } catch (PDOException $e) {
            echo "Error inserting file: " . $e->getMessage();
        }
    } else {
        echo "Cannot connect to the database.";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['files'])) {
        $filename = $_POST['files'];
        insert_file($filename);
    }
}
?>