// Theme toggle

document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem('theme') == "dark") {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById("theme").innerHTML = "Light Theme";
    }else{
        document.body.setAttribute('data-theme', 'light');
        document.getElementById("theme").innerHTML = "Dark Theme";
    }
});

const themeBtn = document.getElementById("theme"); 
themeBtn.addEventListener("click", ()=> {
    if (localStorage.getItem('theme') == "light") {
        localStorage.setItem("theme", "dark");
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById("theme").innerHTML = "Light Theme";
    } else {
        localStorage.setItem("theme", "light");
        document.body.setAttribute('data-theme', 'light');
        document.getElementById("theme").innerHTML = "Dark Theme";
    }
});


