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


var radios = document.getElementsByClassName('btn-check');
for (var i = 0; i < radios.length; i++)
{
    radios[i].addEventListener("click", adjustPrice(i))
}

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