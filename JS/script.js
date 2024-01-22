const loginContainer = document.getElementById('login-container');
const signUpContainer = document.getElementById('signup-container');
const loginLink = document.getElementById('Login-btn');
const signUpLink = document.getElementById('SignUp-btn')
const CloseIcon = document.getElementById('close-icon');


signUpLink.addEventListener('click', () => {
    if (signUpContainer.classList.contains('inactive')){
        signUpContainer.classList.remove('inactive');
        signUpContainer.classList.add('active');
        loginContainer.classList.add('inactive');
        loginContainer.classList.remove('active');
    }
    else{console.log("hello")}
});

loginLink.addEventListener('click', () => {
    if (loginContainer.classList.contains('inactive')){
        loginContainer.classList.remove('inactive');
        loginContainer.classList.add('active');
        signUpContainer.classList.add('inactive');
        signUpContainer.classList.remove('active');
        
    }
    else(console.log("HI"))
});

