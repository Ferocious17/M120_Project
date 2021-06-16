var selectedDeparture = sessionStorage.getItem("selectedDeparture");
var selectedFrom = sessionStorage.getItem("selectedFrom");
var selectedTo = sessionStorage.getItem("selectedTo");
var date = sessionStorage.getItem("date");

function modifyTime(field) 
{
    var time = field.innerHTML;
    var modifiedTime = "";
    modifiedTime = time.substring(time.indexOf('T') + 1, time.indexOf('+') - 3);
    field.innerHTML = modifiedTime;
}

function insertInformation() 
{
    document.querySelector('#from').innerHTML = selectedFrom;
    document.querySelector('#to').innerHTML = selectedTo;
    document.querySelector('#date').innerHTML = date;
    document.querySelector('#time').innerHTML = selectedDeparture;
}

insertInformation();
modifyTime(document.querySelector('#time'));

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
    sessionStorage.setItem("way", "oneWay");
}
else
{
    document.querySelector('#twoWayRadio').checked = true;
    sessionStorage.setItem("way", "twoWay");
}

var voyageClass = sessionStorage.getItem("class");
if (voyageClass === null || voyageClass === "second")
{
    document.querySelector('#secondClassRadio').checked = true;
    sessionStorage.setItem("class", "second"); 
}
else
{
    document.querySelector('#firstClassRadio').checked = true;
    sessionStorage.setItem("class", "first");
}

document.querySelector('#oneWayRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("way") === "oneWay")
        return;

    var currentPrice = sessionStorage.getItem("price");
    currentPrice /= 2;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = currentPrice;
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("way", "oneWay");
})

document.querySelector('#twoWayRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("way") === "twoWay")
        return;

    var currentPrice = sessionStorage.getItem("price");
    currentPrice *= 2;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = currentPrice;
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("way", "twoWay");
})

document.querySelector('#firstClassRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("class") === "first")
        return;

    var currentPrice = parseFloat(sessionStorage.getItem("price"));
    currentPrice += 5;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = currentPrice;
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("class", "first");
})

document.querySelector('#secondClassRadio').addEventListener("click", function() {
    if (sessionStorage.getItem("class") === "second")
        return;

    var currentPrice = parseFloat(sessionStorage.getItem("price"));
    currentPrice -= 5;
    currentPrice = (Math.round(currentPrice*10)/10).toFixed(2);
    document.querySelector('#price').innerHTML = currentPrice;
    sessionStorage.setItem("price", currentPrice);
    sessionStorage.setItem("class", "second");
})

function adjustPrice(index)
{
    if (this.checked)
    {
        return;
    }

    var currentPrice = sessionStorage.getItem("price");

    switch(index)
    {
        case 0:
            currentPrice /= 2;
            break;
        case 1:
            currentPrice *= 2;
            break;
        case 2:
            currentPrice += 5;
            break;
        case 3:
            currentPrice -= 5;
            break;
    }

    sessionStorage.setItem("price", currentPrice);
    document.querySelector('#price').innerHTML = currentPrice;
}