//input fields
var fields = document.getElementsByTagName('input');

//button
const searchButton = document.querySelector('#submitButton');

function clickButton(event)
{
    //executed if enter key is hit
    if (event.keyCode === 13)
    {
        event.preventDefault();
        searchButton.click();
    }
    else
    {
        this.classList.remove("is-invalid");
    }
}

function validate()
{
    var valid = true;

    for (var i = 0; i < fields.length-1; i++)
    {
        if (fields[i].value === "")
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

//listen to enter hit
for (var i = 0; i < fields.length; i++)
{
    fields[i].addEventListener("keyup", clickButton);
}

//button click
searchButton.addEventListener("click", function() {
    if (validate())
    {
        sessionStorage.setItem("from", fields[0].value);
        sessionStorage.setItem("to", fields[1].value);
        sessionStorage.setItem("date", fields[2].value);
        sessionStorage.setItem("time", fields[3].value);
        sessionStorage.setItem("isArrivalTime", fields[4].checked);

        window.location.href = "../app/view/connections.html";
    }
    else
    {
        console.warn("invalid data");
    }
});

setValues();

function setValues()
{
    //page is not loaded for the first time
    if (sessionStorage.getItem("from") != null)
    {
        fields[0].value = sessionStorage.getItem("from");
        fields[1].value = sessionStorage.getItem("to");
        fields[2].value = sessionStorage.getItem("date");
        //uncomment the next line to keep the stored time in the input instead of updating it regularly
        //fields[3].value = sessionStorage.getItem("time");
        fields[4].checked = (sessionStorage.getItem("isArrivalTime") === "true" ? true : false);
    }
}

function toLogin(from)
{
    sessionStorage.setItem("toLoginFrom", from);
    window.location.href = "../app/view/login.html";
}