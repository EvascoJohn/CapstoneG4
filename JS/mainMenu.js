const logout = document.querySelectorAll("button.Logout-btn");
const newFile = document.querySelectorAll("button.newFile");

const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('./index.html');
};

newFile.addEventListener("click", function(event) {
    header("Location: ./CreateNewFile.html")
});

         