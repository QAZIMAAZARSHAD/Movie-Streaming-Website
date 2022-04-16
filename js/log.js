document.getElementById("btn-log").addEventListener('click',() => {
    // To remove all sessions 
    sessionStorage.clear();  
    window.location.href = "login.html";
})
