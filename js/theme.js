const checkbox = document.getElementById('checkbox');

function toggleTheme() {
    // Obtains an array of all <link>
    // elements.
    // Select your element using indexing.
    var theme = document.getElementById("style1");

    // Change the value of href attribute
    // to change the css sheet.
    if (theme.getAttribute('href') == './static/light-theme.css') {
        theme.setAttribute('href', 'cards.css');
    } else {
        theme.setAttribute('href', './static/light-theme.css');
    }
}
checkbox.addEventListener('change', ()=>{
    document.body.classList.toggle('light');
    toggleTheme();
})
