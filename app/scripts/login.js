document.querySelector("#loginButton").addEventListener("click", function() {
    //if login succeeds
    if (validate())
    {
        sessionStorage.setItem("isLoggedIn", true);
        var toLoginFrom  = sessionStorage.getItem("toLoginFrom");

        if (toLoginFrom === "tempView")
        {
            window.location.href = "../view/confirmation.html";
        }
        else
        {
            window.location.href = toLoginFrom;
        }
    }
});

const fields = document.getElementsByTagName('input');
function validate()
{
    var valid = true;

    for (var i = 0; i < fields.length; i++)
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