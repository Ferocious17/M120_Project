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
    document.querySelectorAll('.from')[1].innerHTML = selectedFrom;
    document.querySelectorAll('.to')[0].innerHTML = selectedTo;
    document.querySelectorAll('.to')[1].innerHTML = selectedTo;
    document.querySelectorAll('.date')[0].innerHTML = date;
    document.querySelectorAll('.date')[1].innerHTML = date;
    document.querySelectorAll('.time')[0].innerHTML = selectedDeparture;
    document.querySelectorAll('.time')[1].innerHTML = selectedDeparture;
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + sessionStorage.getItem("price");
}

insertInformation();
modifyTime(document.querySelectorAll('.time'));

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

for (var i = 0; i < fields.length; i++)
{
    fields[i].addEventListener("keyup", function() {
        this.classList.remove("is-invalid");
    }); 
}

//set the radios for the correspondig picks
var way = sessionStorage.getItem("way");
if (way === null || way === "oneWay")
{
    document.querySelector('#oneWayRadio').checked = true;
    document.querySelector('#way').innerHTML = "Hinfahrt";
    sessionStorage.setItem("way", "oneWay");
}
else
{
    document.querySelector('#twoWayRadio').checked = true;
    document.querySelector('#way').innerHTML = "Hin- & Rückfahrt";
    sessionStorage.setItem("way", "twoWay");
}

var voyageClass = sessionStorage.getItem("class");
if (voyageClass === null || voyageClass === "second")
{
    document.querySelector('#secondClassRadio').checked = true;
    document.querySelector('#class').innerHTML = "2. Klasse";
    sessionStorage.setItem("class", "second"); 
}
else
{
    document.querySelector('#firstClassRadio').checked = true;
    document.querySelector('#class').innerHTML = "1. Klasse";
    sessionStorage.setItem("class", "first");
}

document.querySelector('#oneWayRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("way") === "oneWay")
        return;

    var currentPrice = sessionStorage.getItem("price");
    currentPrice /= 2;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + currentPrice;
    document.querySelector('#way').innerHTML = "Hinfahrt";
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("way", "oneWay");
});

document.querySelector('#twoWayRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("way") === "twoWay")
        return;

    var currentPrice = sessionStorage.getItem("price");
    currentPrice *= 2;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + currentPrice;
    document.querySelector('#way').innerHTML = "Hin- & Rückfahrt";
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("way", "twoWay");
});

document.querySelector('#firstClassRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("class") === "first")
        return;

    var currentPrice = parseFloat(sessionStorage.getItem("price"));
    currentPrice += 5;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + currentPrice;
    document.querySelector('#class').innerHTML = "1. Klasse";
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("class", "first");
});

document.querySelector('#secondClassRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("class") === "second")
        return;

    var currentPrice = parseFloat(sessionStorage.getItem("price"));
    currentPrice -= 5;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = "Gesamtpreis: " + currentPrice;
    document.querySelector('#class').innerHTML = "2. Klasse";
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("class", "second");
});

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

var firstname = sessionStorage.getItem("guestFirstname");
var lastname = sessionStorage.getItem("guestLastname");
var birthdate = sessionStorage.getItem("guestBirthdate");
var noDiscountsChecked = sessionStorage.getItem("noDiscount");
var halbtaxChecked = sessionStorage.getItem("halbtax");
var juniorcardChecked = sessionStorage.getItem("juniorcard");
var childcardChecked = sessionStorage.getItem("childcard");

if (firstname !== "null")
{
    document.querySelector('#firstnameInput').value = firstname;
    document.querySelector('#lastnameInput').value = lastname;
    document.querySelector('#birthdateInput').value = birthdate;
    document.querySelector('#noDiscounts').checked = (noDiscountsChecked === "true");
    document.querySelector('#halbtax').checked = (halbtaxChecked === "true");
    document.querySelector('#juniorcard').checked = (juniorcardChecked === "true");
    document.querySelector('#childcard').checked = (childcardChecked === "true");
}

document.querySelector('#purchaseButton').addEventListener("click", function() {
    if (validate())
    {
        sessionStorage.setItem("guestFirstname", document.querySelector('#firstnameInput').value);
        sessionStorage.setItem("guestLastname", document.querySelector('#lastnameInput').value);
        sessionStorage.setItem("guestBirthdate", document.querySelector('#birthdateInput').value);
        sessionStorage.setItem("noDiscount", document.querySelector('#noDiscounts').checked);
        sessionStorage.setItem("halbtax", document.querySelector('#halbtax').checked);
        sessionStorage.setItem("juniorcard", document.querySelector('#juniorcard').checked);
        sessionStorage.setItem("childcard", document.querySelector('#childcard').checked);
        window.location.href = "../view/payment.html";
    }
});