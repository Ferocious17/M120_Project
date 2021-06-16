//listener for numeric input PLZ
function isNumber(event)
{
    var inputKeyCode = (event.which) ? event.which : event.keyCode;
    if (inputKeyCode > 31 && (inputKeyCode < 48 || inputKeyCode > 57))
        return false;
    
    return true;
}

//input fields
var fields = document.getElementsByTagName('input');

for (var i = 0; i < fields.length; i++)
{
    fields[i].addEventListener("keyup", function() {
        this.classList.remove("is-invalid");
    }); 
}

function validate()
{
    var valid = true;
    document.querySelector('#passwordNotEqual').innerHTML = "Bitte bestätigen Sie Ihr Passwort";

    for (var i = 0; i < fields.length; i++)
    {
        if (fields[i].value === "" )
        {
            fields[i].classList.add("is-invalid");
            valid = false;
        }
        else if (fields[i].value != "")
        {
            fields[i].classList.remove("is-invalid");
        }
    }

    return valid;
}

function validatePassword()
{
    const passwordInput = document.querySelector('#passwordInput');
    const confirmPasswortInput = document.querySelector('#confirmPasswortInput');
    var equal = true;

    //check if entered passwords are equal
    if (passwordInput.value !== confirmPasswortInput.value)
    {
        confirmPasswortInput.classList.add("is-invalid");
        document.querySelector('#passwordNotEqual').innerHTML = "Die eingegebenen Passwörter stimmen nicht überein";
        equal = false;
    }
    //TODO - implement conditions for password (3 numbers, 2 upper case letters etc.)
    else
    {
        confirmPasswortInput.classList.remove("is-invalid");
        equal = true;
    }

    return equal;
}

document.querySelector('#registerButton').addEventListener("click", function() {
    console.log("called");
    if (validate())
    {
        if (validatePassword())
        {

        }
    }
});