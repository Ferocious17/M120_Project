var from = sessionStorage.getItem("from");
var to = sessionStorage.getItem("to");
var date = sessionStorage.getItem("date");
var time = sessionStorage.getItem("time");
var isArrivalTime = sessionStorage.getItem("isArrivalTime");

var state = 0;
if (isArrivalTime === "false") 
{
    state = 1;
}

var apiQuery = "http://transport.opendata.ch/v1/connections?transportations[]=train&from=" + from + "&to=" + to + "&date=" + date + "&time=" + time + "&isArrivalTime=" + state;

function mustache(data) 
{
    return new Promise((resolve, reject) => {
        var tableTemplate = $('#table').html();
        var renderedTable = Mustache.render(tableTemplate, data);
        $('#tableBody').html(renderedTable);
        resolve();
    });
}

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

function modifyTime(fields, isDuration) 
{
    for (var i = 0; i < fields.length; i++) 
    {
        var time = fields[i].innerHTML;
        var modifiedTime = "";

        if (isDuration) 
        {
            modifiedTime = time.substring(time.indexOf('d') + 1);
        }
        else 
        {
            modifiedTime = time.substring(time.indexOf('T') + 1, time.indexOf('+') - 3);
        }

        fields[i].innerHTML = modifiedTime;
    }
}

function modifyJourneys(fields)
{
    for (var i = 0; i < fields.length; i++)
    {
        var journey = fields[i].innerHTML;
        fields[i].innerHTML = journey.substring(0, journey.indexOf(' '));
    }
}

function beautifyContent() 
{
    var tableFromTimeFields = document.querySelectorAll('.tableFromTime');
    var tableToTimeFields = document.querySelectorAll('.tableToTime');
    var tableDurationFields = document.querySelectorAll('.tableDuration');
    var journeyFields = document.querySelectorAll('.journey');

    modifyTime(tableFromTimeFields, false);
    modifyTime(tableToTimeFields, false);
    modifyTime(tableDurationFields, true);
    modifyJourneys(journeyFields);
}


function addRowClickEvents() 
{
    var connectionRows = document.querySelectorAll('.connectionRow');
    var hiddenRows = document.querySelectorAll('.hiddenRow');
    var buttons = document.getElementsByClassName('rowExpander');

    for (let i = 0; i < connectionRows.length; i++) 
    {
        connectionRows[i].addEventListener("click", function () 
        {
            if (buttons[i].classList.contains("fa-plus-square-o")) 
            {
                buttons[i].classList.remove("fa-plus-square-o");
                buttons[i].classList.add("fa-minus-square-o");
                hiddenRows[i].classList.remove("hiddenRow");
            }
            else 
            {
                buttons[i].classList.remove("fa-minus-square-o");
                buttons[i].classList.add("fa-plus-square-o");
                hiddenRows[i].classList.add("hiddenRow");
            }
        });
    }
}

async function load(data) 
{
    await mustache(data);
    insertInformation();
    beautifyContent();
    addRowClickEvents();
    addDetailRowClickEvents();
}

$.get(apiQuery, function (data) {
    sessionStorage.setItem("page", 0);
    load(data);
});

//these are the x coordinates of the respective stations
function setPrice(duration)
{
    var modifiedDuration = duration.substring(duration.indexOf('d') + 1);
    var hms = modifiedDuration.split(':');
    var minutes = hms[0] * 60 + parseInt(hms[1]);

    var price = minutes * 0.3;
    return (Math.round(price*10)/10).toFixed(2);
}

function selectConnection(departure, arrival, duration) 
{
    sessionStorage.setItem("price", setPrice(duration));
    sessionStorage.setItem("selectedDeparture", departure);
    sessionStorage.setItem("selectedArrival", arrival);
    sessionStorage.setItem("selectedFrom", from);
    sessionStorage.setItem("selectedTo", to);
    
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn == null || isLoggedIn == false)
    {
        //show page with "continue as guest" or "log in" if not logged in already
        window.location.href = "../view/tempView.html";
        return;
    }

    //already logged in
    window.location.href = "data.html";
}

function paginate(number)
{
    var page = parseInt(sessionStorage.getItem("page")) + number;

    if (page === 2)
    {
        document.querySelector("#later").style.display = "none";
        document.querySelector("#pagination").style.justifyContent = "center";
        apiQuery = "http://transport.opendata.ch/v1/connections?transportations[]=train&from=" + from + "&to=" + to + "&date=" + date + "&time=" + time + "&isArrivalTime=" + state + "&page=" + page;
        $.get(apiQuery, function (data) {
            load(data);
        });

        return;
    }
    else if (page === -2)
    {
        document.querySelector("#earlier").style.display = "none";
        document.querySelector("#pagination").style.justifyContent = "center";

        apiQuery = "http://transport.opendata.ch/v1/connections?transportations[]=train&from=" + from + "&to=" + to + "&date=" + date + "&time=" + time + "&isArrivalTime=" + state + "&page=" + page;
        $.get(apiQuery, function (data) {
            load(data);
        });

        return;
    }

    document.querySelector("#later").style.display = "block";
    document.querySelector("#earlier").style.display = "block";
    document.querySelector("#pagination").style.justifyContent = "space-between";

    apiQuery = "http://transport.opendata.ch/v1/connections?transportations[]=train&from=" + from + "&to=" + to + "&date=" + date + "&time=" + time + "&isArrivalTime=" + state + "&page=" + page;
    $.get(apiQuery, function (data) {
        load(data);
    });

    sessionStorage.setItem("page", page);
}

function toLogin(from)
{
    sessionStorage.setItem("toLoginFrom", from);
    window.location.href = "login.html";
}

function addDetailRowClickEvents()
{
    var showPassListButtons = document.querySelectorAll('.showPassListButton');
    var passList = document.querySelectorAll('.passList');

    for (let i = 0; i < showPassListButtons.length; i++)
    {
        showPassListButtons[i].addEventListener("click", function() {
            if (showPassListButtons[i].innerHTML === "Alle Stationen anzeigen")
            {
                passList[i].style.display = "block";
                showPassListButtons[i].innerHTML = "Stationen verbergen";
            }
            else
            {
                passList[i].style.display = "none";
                showPassListButtons[i].innerHTML = "Alle Stationen anzeigen";
            }
        });
    }
}