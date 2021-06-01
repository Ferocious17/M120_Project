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

function beautifyContent() 
{
    var tableFromTimeFields = document.querySelectorAll('.tableFromTime');
    var tableToTimeFields = document.querySelectorAll('.tableToTime');
    var tableDurationFields = document.querySelectorAll('.tableDuration');

    modifyTime(tableFromTimeFields, false);
    modifyTime(tableToTimeFields, false);
    modifyTime(tableDurationFields, true);
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
}

$.get(apiQuery, function (data) {
    sessionStorage.setItem("page", 0);
    load(data);
});

function selectConnection(departure, from, to) 
{
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn == null || isLoggedIn == false)
    {
        //show page with "continue as guest" or "log in"
        window.location.href = "../view/tempView.html";
        return;
    }

    sessionStorage.setItem("selectedDeparture", "");
    sessionStorage.setItem("selectedFrom", "");
    sessionStorage.setItem("selectedTo", "");

    //window.location.href = "data.html";
}

function paginate(number)
{
    var page = parseInt(sessionStorage.getItem("page")) + number;
    
    if (page === 3)
    {
        document.querySelector("#later").style.display = "none";
        document.querySelector("#pagination").style.justifyContent = "center";
        return;
    }
    else if (page === -3)
    {
        document.querySelector("#earlier").style.display = "none";
        document.querySelector("#pagination").style.justifyContent = "center";
        return;
    }

    document.querySelector("#later").style.display = "block";
    document.querySelector("#earlier").style.display = "block";
    document.querySelector("#pagination").style.justifyContent = "space-between";

    //page += number;
    apiQuery = "http://transport.opendata.ch/v1/connections?transportations[]=train&from=" + from + "&to=" + to + "&date=" + date + "&time=" + time + "&isArrivalTime=" + state + "&page=" + page;
    $.get(apiQuery, function (data) {
        load(data);
    });

    sessionStorage.setItem("page", page);
}