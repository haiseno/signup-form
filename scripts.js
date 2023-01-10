const inputs = document.querySelectorAll("input");
const listItems = document.querySelectorAll(".password-container li");

inputs.forEach(input => input.addEventListener("focus", checkValidity));

function checkValidity(e) {
    //Grab onto the input DOM element
    const inputElement = e.composedPath()[0];

    switch (inputElement.id) {
        case "form-first-name":
        case "form-last-name":
        case "form-email":
        case "form-username":
        case "form-password":
        case "form-confirm-password":
            inputElement.addEventListener("blur", validity);
            if (userInteract) {
                inputElement.addEventListener("input", validity);
            }
            inputElement.addEventListener("input", passwordCheck);
            inputElement.addEventListener("input", confirmPasswordCheck);
            break;
    }
}

let userInteract;

function validity(e) {
    const inputElement = e.composedPath()[0];

    if (inputElement.value !== "") {
        userInteract = true;
    }
    else {
        userInteract = false;
        inputElement.classList.remove("validity", "invalidity");
        inputElement.removeEventListener("input", validity);
    }

    if (userInteract) {
        if (inputElement.checkValidity()) {
            inputElement.classList.remove("invalidity");
            inputElement.classList.add("validity");
        }
        else {
            inputElement.classList.add("invalidity");
            inputElement.classList.remove("validity");
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