<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST");

$servername = "localhost";
$username = "root";
$password = "Yash@sql24";
$dbname = "mydatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    // Parse the JSON.
    $request = json_decode($postdata);

    // Sanitize.
    $prompt = mysqli_real_escape_string($conn, trim($request->prompt));
    $response = mysqli_real_escape_string($conn, trim($request->response));

    // Insert data.
    $sql = "INSERT INTO responses (prompt, response) VALUES ('$prompt', '$response')";

    if($conn->query($sql) === TRUE) {
        http_response_code(201);
        echo json_encode(["message" => "prompt created successfully"]);
    } else {
        http_response_code(422);
        echo json_encode(["message" => "Error creating user"]);
    }

    // Close the connection
    $conn->close();
}
?>
