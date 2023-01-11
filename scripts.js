const inputs = document.querySelectorAll("input");
const listItems = document.querySelectorAll(".password-container li");
const form = document.querySelector("form");

inputs.forEach(input => input.addEventListener("focus", checkValidity));
form.addEventListener("submit", checkSubmit);

let oldInput;
let newInput;

let canSubmit;

//Validation behavior based on this thread "https://twitter.com/vponamariov/status/1380182211576664067"
function checkValidity(e) {
    //Grab onto the input DOM element
    const inputElement = e.composedPath()[0];

    //What is our current input
    newInput = inputElement.id;

    switch (inputElement.id) {
        case "form-first-name":
        case "form-last-name":
        case "form-email":
        case "form-username":
        case "form-password":
        case "form-confirm-password":
            //Checks validation only when user leaves input
            inputElement.addEventListener("blur", validity);
            //Checks validation while user is focused on input if they had previously interacted with it
            if (oldInput === newInput && userInteract) {
                inputElement.addEventListener("input", validity);
            }
            //Toggles password requirements visual validation
            inputElement.addEventListener("input", passwordCheck);
            //Updates confirmPassword variable
            inputElement.addEventListener("input", confirmPasswordCheck);
            break;
    }
}

//Switch-like variable to check whether user has actually already interacted with the input
let userInteract;
let inputValid; //This switch-like variable is just for confirmPassword check

function validity(e) {
    const inputElement = e.composedPath()[0];

    //Checks if user has actually interacted with the input
    if (inputElement.value !== "") {
        userInteract = true;
        oldInput = inputElement.id;
    }
    else { //If not, reset all validation behavior
        userInteract = false;
        inputElement.classList.remove("validity", "invalidity");
        inputElement.removeEventListener("input", validity);
    }

    //Checks input validity and adds appropriate class which will toggle CSS visual indicator
    if (userInteract) {
        if (inputElement.checkValidity()) {
            inputElement.classList.remove("invalidity");
            inputElement.classList.add("validity");
            inputValid = true; 
        }
        else {
            inputElement.classList.add("invalidity");
            inputElement.classList.remove("validity");
            inputValid = false;
        }
    }

    //Special case for confirm pass input field because it has to match pattern and password
    if (userInteract && inputElement.id === "form-confirm-password" && inputValid) {
        if (password === confirmPassword) {
            inputElement.classList.remove("invalidity");
            inputElement.classList.add("validity");
            canSubmit = true;
        }
        else {
            inputElement.classList.add("invalidity");
            inputElement.classList.remove("validity");
            canSubmit = false;
        }
    }
}

let password;
let confirmPassword;

const uppercase = /(?=.*[A-Z])/;
const lowercase = /(?=.*[a-z])/;
const number = /(?=.*\d)/;
const special = /(?=.*[@$!%*?&])/;

//Password requirements validation visual CSS
function passwordCheck(e) {
    const inputElement = e.composedPath()[0];

    //Prevent switch statement fallthrough
    if (inputElement.id !== "form-password") {
        return;
    }

    //Store password input in a string for RegEx match
    password = inputElement.value;

    //Toggles live visual indicator for when password requirements are met
    listItems.forEach(listItem => {
        switch (listItem.id) {
            case "length":
                if (password.length >= 8) {
                    listItem.classList.add("password-valid");
                }
                else {
                    listItem.classList.remove("password-valid");
                }
                break;
            case "uppercase":
                togglePasswordValidation(uppercase, listItem);
                break;
            case "lowercase":
                togglePasswordValidation(lowercase, listItem);
                break;
            case "number":
                togglePasswordValidation(number, listItem);
                break;
            case "special":
                togglePasswordValidation(special, listItem);
                break;
        }
    });
}

function togglePasswordValidation(pattern, listItem) {
    if (pattern.test(password)) {
        listItem.classList.add("password-valid");
    }
    else {
        listItem.classList.remove("password-valid");
    }
}

//Updates confirmPassword variable
function confirmPasswordCheck(e) {
    const inputElement = e.composedPath()[0];

    //Prevent switch statement fallthrough
    if (inputElement.id !== "form-confirm-password") {
        return;
    }

    //Store password input in a string for RegEx match
    confirmPassword = inputElement.value;
}

//Stop form submission if passwords do not match
function checkSubmit(e) {
    if (!canSubmit) {
        e.preventDefault();
    }
}