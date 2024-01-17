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
 <!-- Main Menu Interface -->
 <!-- <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;900&display=swap" rel="stylesheet">

        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;900&display=swap');

            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                border-style: none;
                list-style: none;
            }
            nav{
                font-family: 'Roboto', sans-serif;
                width: 100%;
                display: flex;
                background-color: maroon;
                justify-content: space-between;
            }
            nav .buttons{
                width: 10%;
                margin: 10px;
            }
            nav .buttons .Logout-btn{
                width: 125px;
                height: 50px;
                background-color: White;
                padding: 15px;
                border-radius: 50px;
            }
            nav .buttons .Logout-btn:hover{
                font-size: 1.075em;
                font-
            }
            nav .accountDetail .picture{
                background-color:white;
                width: 50px;
                height: 50px;
                margin: 5px;
                border-radius: 50%;
            }
            nav .accountDetail{
                margin-left: 10px;
                width: 80%;
                display: flex;
                align-items: center;
                /* justify-content: center; */
                color: white;
            }
            main button{
                width: 250px;
                height: 250px;
                background-color: maroon;
                color: white;
                font-family: 'Roboto', sans-serif;
                margin: 20px;
                border-radius: 25px;

            }
            main button{
            
            }

        </style>
    </head>
    <body>
        <nav>
            <div class="accountDetail">
                <div class="picture"><img src="" alt=""></div>
                <div class="userName"><?php echo "WELCOME! ". $lastName.", ". $firstName?></div>
            </div>
            <div class="buttons">
                <button class="Logout-btn">LOG OUT</button>
            </div>
        </nav>
        <main>
            <Button class="newFile btn">
                <div class="newFileIcon">
                    <img src="" alt="">
                </div>
                <p>Create New File</p>
            </Button>
            <Button class="importFile btn">
                <div class="importFileIcon">
                    <img src="" alt="">
                </div>
                <p>Import File</p>
            </Button>
        </main>
    </body>
    </html> -->