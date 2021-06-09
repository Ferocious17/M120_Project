var from = sessionStorage.getItem("from");
var to = sessionStorage.getItem("to");
var date = sessionStorage.getItem("date");
var time = sessionStorage.getItem("time");
var isArrivalTime = sessionStorage.getItem("isArrivalTime");

function insertInformation() 
{
    document.querySelector('#from').innerHTML = from;
    document.querySelector('#to').innerHTML = to;
    document.querySelector('#date').innerHTML = date;
    document.querySelector('#time').innerHTML = time;

    if (isArrivalTime === "true") 
    {
        document.querySelector('#departureArrivalInfo').innerHTML = "Abfahrt";
    }
    else 
    {
        document.querySelector('#departureArrivalInfo').innerHTML = "Ankunft";
    }
}

insertInformation();

//input fields
var fields = document.getElementsByTagName('input');
function validate()
{
    var valid = true;

    //fields.length-1 to omit button
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