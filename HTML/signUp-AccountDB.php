<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $bname = "logindb";
        //get credentials
        $newUserEmail = $_POST['newUser-Email'];
        $newUserPassword = $_POST['newUser-Password'];
        $newUserFirstName = $_POST['newUser-firstName'];
        $newUserLastName = $_POST['newUser-lastName'];
        
        $conn = new mysqli($servername, $username, $password, $bname);
        

        if ($conn -> connect_error){
            die("connection failed: ".$conn->connect_error);
        }
        
        // CHECKS IF LOGIN CREDENTIALS Already Exist
        $checkCredentials = "SELECT * FROM accountdatatable WHERE userEmail='$newUserEmail'";
        $result = $conn -> query($checkCredentials);
        
        if($result){
            if (mysqli_num_rows($result) > 0) {
                alert('This Account already Exist.');
                exit();
            }
            else{
                $sql = "INSERT INTO accountdatatable (userEmail, userPassword, firstName, lastName) VALUES ('$newUserEmail', SHA('$newUserPassword'), '$newUserFirstName', '$newUserLastName')";

                // Execute query
                if ($conn->query($sql) === TRUE) {
                    $response = "<script>
                        alert('Sign Up Complete.');
                        window.location.href='index.html';
                      </script>";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
            }
            echo ($response);
            $conn->close();
            exit();
        }
        header("Location: ./index.html");


        $conn->close();
        
        // echo "HELOOOOOOOO";     
    }else{
        header("Location: ./index.html");
    }
?>
