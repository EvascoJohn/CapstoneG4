const logout = document.querySelectorAll("button.Logout-btn");
const newFile = document.querySelectorAll("button.newFile");

const handleLogout = () => {
    // window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('./index.html');
};

// newFile.addEventListener("click", function() {
//     header("Location: ./CreateNewFile.html");
// });

         