var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0]; 
window.onclick = function() {
  modal.style.display = "block";
}
window.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const ball = document.querySelector(".toggle-container");
const items = document.querySelectorAll("body,.menu,.menu ul li a,.toggle,button,marquee,.logo,.menu2,.menu2 ul li a,.image-holder,.container,.flim,.hr,.maincontainer,.foot,.close,.close:hover,.close:focus,.modal,.modal-content,.buttonmodal button,.online");
ball.addEventListener("click",() =>{
  items.forEach(item =>{
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});