const loginContainer = document.getElementById('login-container')
const loginLink = document.getElementById('Login-btn');
const CloseIcon = document.getElementById('close-icon')

loginLink.addEventListener('click', () => {
    if (loginContainer.classList.contains('active')){
        loginContainer.classList.remove('active')
        loginContainer.classList.add('inactive')
        
    }
    else{
        loginContainer.classList.remove('inactive');
        loginContainer.classList.add('active');
    }
});

CloseIcon.addEventListener('click', () =>{
    loginContainer.classList.remove('active')
    loginContainer.classList.add('inactive')
})

