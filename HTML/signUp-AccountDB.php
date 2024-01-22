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
        $checkCredentials = "SELECT * FROM accountdatatable WHERE userEmail='$UserEmail'";
        $result = $conn -> query($checkCredentials);
        
        if($result){
            if (mysqli_num_rows($result) > 0) {
                alert('This Account already Exist.')
                exit();
            }
            else{
                $sql = "Insert Into accountdatatable (userEmail, userPassword, firstName, lastName) Values ($newUserEmail, SHA('$newUserPassword'), $newUserFirstName, $newUserLastName)";

            }
            $conn->close();
            exit();
        }
        header("Location: ./index.html");
        // else{

        // }
    
            
        // }


        // $firstName = $row["firstName"];
        // $lastName = $row['lastName'];

        // echo $firstName;
        // $lastName = "SELECT lastname FROM  accountdatatable WHERE email = '$UserEmail'";
        
        
        // $sql = "Insert Into logindb.accountdatatable(email, firstName, LastName)
        // values ( '$UserEmail' , '$UserEmail', '$UserPassword')";

        // if ($conn ->query($sql) === TRUE){
        //     echo "New record creatd successfully";
        // } else {
        //     echo "Error: " . $sql . "<br>" . $conn->error;
        // }


        $conn->close();
        
        // echo "HELOOOOOOOO";     
    }else{
        header("Location: ./index.html");
    }
?>
