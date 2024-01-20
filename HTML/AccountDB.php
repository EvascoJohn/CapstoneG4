<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $bname = "logindb";
        $UserEmail = $_POST['userEmail'];
        $UserPassword = $_POST['userPassword'];
        
        // echo $UserEmail;
        //test if empty
        // if (empty($UserEmail) ){
        //     header("Location: ./index.html");
            
        // }
        // if (empty($UserPassword) ){
        //     header("Location: ./index.html");

        // }
        
        
        $conn = new mysqli($servername, $username, $password, $bname);
        
        if ($conn -> connect_error){
            die("connection failed: ".$conn->connect_error);
        }
        
        // CHECKS IF LOGIN CREDENTIALS IS VALID
        $checkCredentials = "SELECT * FROM accountdatatable WHERE userEmail='$UserEmail' and userPassword='$UserPassword'";
        $result = $conn -> query($checkCredentials);
        
        if($result){
            if (mysqli_num_rows($result) > 0) {
                header("Location: ./mainMenu.html");
                exit();
            }
            else{

                $response = "<script>
                        alert('Incorrect username or password.');
                        window.location.href='index.html';
                      </script>";
            }
            echo ($response);
            $conn->close();
            exit();
        }
        header("Location: ./index.html");
        echo '<script type="text/JavaScript">  
     prompt("GeeksForGeeks"); 
     </script>' ;
        // else{

        // }
    
            
        // }

        //GETTING THE REST OF THE DATA ASSOCIATED WITH THE ACCOUNT THAT IS LOGGED IN
        $getNamesQuery = "SELECT firstname, lastname FROM accountdatatable ORDER BY Lastname";
        $nameResults= mysqli_query($conn, $getNamesQuery);
        $row = mysqli_fetch_assoc($result);
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
