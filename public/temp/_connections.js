var receivedQuery = decodeURIComponent(window.location.search);
receivedQuery = receivedQuery.substring(1);

var params = receivedQuery.split('&');
for (var i = 0; i < params.length; i++) 
{
    console.log(params[i]);
}

var apiQuery = "http://transport.opendata.ch/v1/connections?transportations[]=train&";
for (var i = 0; i < params.length; i++)
{
    if (i === params.length-1)
    {
        apiQuery += params[i];
    }
    else
    {
        apiQuery += params[i] + "&";
    }
} 

/*$.get(apiQuery, function(data) {
    //Mustache for loading data
    var tableTemplate = $('#table').html();
    var renderedTable = Mustache.render(tableTemplate, data);
    $('#tableBody').html(renderedTable);

    insertInformation();
    beatufiy();
});*/

$.get(apiQuery, function(data) {
    load(data);
});

async function load(data)
{
    await mustache(data);
    insertInformation();
    beatufiy();
}

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
    document.querySelector('#from').innerHTML = params[0].substring(params[0].indexOf('=')+1);
    document.querySelector('#to').innerHTML = params[1].substring(params[1].indexOf('=')+1);
    document.querySelector('#date').innerHTML = params[2].substring(params[2].indexOf('=')+1);
    document.querySelector('#time').innerHTML = params[3].substring(params[3].indexOf('=')+1);
}

function beatufiy()
{
    var tableFromField = document.querySelector('#tableFrom');
    var tableDurationField = document.querySelector('#tableDuration');

    var from = tableFromField.value;
    var duration = tableFromField.value;

    var fromModified = from.substring(from.indexOf('T'), from.indexOf('+'));
    var durationModified = duration.substring(duration.indexOf('d')+1);

    console.log(duration);
    console.log(durationModified);

    tableFromField.value = fromModified;
    tableDurationField.value = durationModified;
}