const pass = document.querySelector("#form-password");
const confirmPass = document.querySelector("#confirm-password");

const minimumLengthReq = document.querySelector(".minimum-length");
const uppercaseReq = document.querySelector(".uppercase");
const lowercaseReq = document.querySelector(".lowercase");
const numberReq = document.querySelector(".number");
const specialReq = document.querySelector(".special");

let password;
let confirmPassword;

const uppercase = /(?=.*[A-Z])/;
const lowercase = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const special = /(?=.*[@$!%*?&])/;

pass.addEventListener("input", passwordCheck);
confirmPass.addEventListener("input", confirmPasswordCheck);

pass.addEventListener("keypress", (e) => {
    //Prevent spaces from being entered
    let key = e.code;
    if (key === "Space") {
        e.preventDefault();
    }
});

confirmPass.addEventListener("keypress", (e) => {
    //Prevent spaces from being entered
    let key = e.code;
    if (key === "Space") {
        e.preventDefault();
    }
});

//Password validation CSS
function passwordCheck() {
    //Store password input in a string for RegEx match
    password = pass.value;
    
    //Minimum length of 8
    if (password.length >= 8) {
        minimumLengthReq.classList.add("password-valid");
    }
    else {
        minimumLengthReq.classList.remove("password-valid");
    }

    //Contains at least one uppercase
    if (uppercase.test(password)) {
        uppercaseReq.classList.add("password-valid");
    }
    else {
        uppercaseReq.classList.remove("password-valid");
    }

    //Contains at least one lowercase
    if (lowercase.test(password)) {
        lowercaseReq.classList.add("password-valid");
    }
    else {
        lowercaseReq.classList.remove("password-valid");
    }

    //Contains at least one number
    if (number.test(password)) {
        numberReq.classList.add("password-valid");
    }
    else {
        numberReq.classList.remove("password-valid");
    }

    //Contains at least one special character
    if (special.test(password)) {
        specialReq.classList.add("password-valid");
    }
    else {
        specialReq.classList.remove("password-valid");
    }
}

//Checks if passwords match
function confirmPasswordCheck() {
    confirmPassword = confirmPass.value;
    
    if (password === confirmPassword) {
        confirmPass.classList.remove("not-confirmed");
        confirmPass.classList.add("confirmed");
    }
    else {
        confirmPass.classList.remove("confirmed");
        confirmPass.classList.add("not-confirmed");
    }
}