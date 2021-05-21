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

        //var queryURL = "../app/view/connections.html?from=" + fields[0].value + "&to=" + fields[1].value + "&date=" + fields[2].value + "&time=" + fields[3].value;
        //var queryURL = "../app/view/connections.html";
        //window.location.href = queryURL;
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
        fields[3].value = sessionStorage.getItem("time");
        fields[4].checked = (sessionStorage.getItem("isArrivalTime") === "true" ? true : false);
    }
}