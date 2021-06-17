"use strict";
/*var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};*/

var slides = document.querySelector(".slider-items").children;
var nextSlide = document.querySelector(".right-slides");
var prevSlide = document.querySelector(".left-slides");
var index = 0;
var totalSlides = slides.length;

nextSlide.onclick = function () {
  next("next");
};

prevSlide.onclick = function () {
  next("prev");
};

function next(directions) {
  if (directions == "next") {
    if (totalSlides - index > 5) {
      slides[index].classList.remove("active");
      slides[index].classList.add("hidden");
      slides[index + 5].classList.remove("hidden");
      slides[index + 5].classList.add("active");
      index++;
    }
  } else if (directions == "prev") {
    if (index > 0) {
      slides[index + 4].classList.remove("active");
      slides[index + 4].classList.add("hidden");
      slides[index - 1].classList.remove("hidden");
      slides[index - 1].classList.add("active");
      index--;
    }
  }
}

var slides2 = document.querySelector(".slider-items1").children;
var nSlide = document.querySelector(".right-slide");
var pSlide = document.querySelector(".left-slide");
var index1 = 0;
var totalSlides2 = slides2.length;

nSlide.onclick = function () {
  nexts("next");
};
pSlide.onclick = function () {
  nexts("prev");
};
function nexts(directions) {
  if (directions == "next") {
    if (totalSlides2 - index1 > 5) {
      slides2[index1].classList.remove("active");
      slides2[index1].classList.add("hidden");
      slides2[index1 + 5].classList.remove("hidden");
      slides2[index1 + 5].classList.add("active");
      index1++;
    }
  } else if (directions == "prev") {
    if (index1 > 0) {
      slides2[index1 + 4].classList.remove("active");
      slides2[index1 + 4].classList.add("hidden");
      slides2[index1 - 1].classList.remove("hidden");
      slides2[index1 - 1].classList.add("active");
      index1--;
    }
  }
}
var slides3 = document.querySelector(".slider-items2").children;
var neSlide = document.querySelector(".right-slidess");
var peSlide = document.querySelector(".left-slidess");
var index2 = 0;
var totalslides3 = slides3.length;

neSlide.onclick = function () {
  console.log("hi");
  nextclick("next");
};
peSlide.onclick = function () {
  nextclick("prev");
};
function nextclick(directions) {
  if (directions == "next") {
    console.log("hi");
    if (totalslides3 - index2 > 5) {
      slides3[index2].classList.remove("active");
      slides3[index2].classList.add("hidden");
      slides3[index2 + 5].classList.remove("hidden");
      slides3[index2 + 5].classList.add("active");
      index2++;
    }
  } else if (directions == "prev") {
    if (index2 > 0) {
      slides3[index2 + 4].classList.remove("active");
      slides3[index2 + 4].classList.add("hidden");
      slides3[index2 - 1].classList.remove("hidden");
      slides3[index2 - 1].classList.add("active");
      index2--;
    }
  }
}
