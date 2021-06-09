//icon
var themeToggle = document.querySelector('.themeToggle');

//load theme when window is loaded
window.onload = function() {
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === null || currentTheme === "light")
    {
        document.body.classList.remove("dark-theme");
    }
    else
    {
        document.body.classList.add("dark-theme");
    }

    setThemeIcon(currentTheme);
}

//theme toggle
themeToggle.addEventListener("click", function() {
    const currentTheme = localStorage.getItem("theme");
    let newTheme = "";

    if (currentTheme === null || currentTheme === "light")
    {
        newTheme = "dark";
    }
    else
    {
        newTheme = "light";
    }

    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", newTheme);
    setThemeIcon(newTheme);
});

function setThemeIcon(currentTheme)
{
    if (currentTheme === null || currentTheme === "light")
    {
        themeToggle.classList.remove("fa-sun-o");
        themeToggle.classList.add("fa-moon-o");
    }
    else
    {
        themeToggle.classList.remove("fa-moon-o");
        themeToggle.classList.add("fa-sun-o");
    }
}