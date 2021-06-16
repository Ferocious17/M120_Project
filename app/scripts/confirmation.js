var selectedDeparture = sessionStorage.getItem("selectedDeparture");
var selectedArrival = sessionStorage.getItem("selectedArrival");
var selectedFrom = sessionStorage.getItem("selectedFrom");
var selectedTo = sessionStorage.getItem("selectedTo");
var date = sessionStorage.getItem("date");

function modifyTime(fields) 
{
    for (var i = 0; i < fields.length; i++)
    {
        var time = fields[i].innerHTML;
        var modifiedTime = "";
        modifiedTime = time.substring(time.indexOf('T') + 1, time.indexOf('+') - 3);
        fields[i].innerHTML = modifiedTime;
    }
}

function insertInformation() 
{
    document.querySelector('.from').innerHTML = selectedFrom;
    document.querySelector('.to').innerHTML = selectedTo;
    document.querySelector('.date').innerHTML = date;
    document.querySelector('.departure').innerHTML = selectedDeparture;
    document.querySelector('.arrival').innerHTML = selectedArrival;
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + sessionStorage.getItem("price");
    document.querySelector('#paidWith').innerHTML = sessionStorage.getItem("paymentMethod");
}

insertInformation();
modifyTime(document.querySelectorAll('.time'));