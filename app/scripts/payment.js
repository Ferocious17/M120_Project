var selectedDeparture = sessionStorage.getItem("selectedDeparture");
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
    document.querySelectorAll('.from')[0].innerHTML = selectedFrom;
    document.querySelectorAll('.to')[0].innerHTML = selectedTo;
    document.querySelectorAll('.date')[0].innerHTML = date;
    document.querySelectorAll('.time')[0].innerHTML = selectedDeparture;
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + sessionStorage.getItem("price");
}

insertInformation();
modifyTime(document.querySelectorAll('.time'));

document.querySelector('#purchaseButton').addEventListener("click", function() {
    const radios = document.querySelectorAll('.radio');

    for (var i = 0; radios.length; i++)
    {
        if (radios[i].checked)
        {
            sessionStorage.setItem("paymentMethod", radios[i].value);
            break;
        }
    }

    window.location.href = "../view/confirmation.html";
});