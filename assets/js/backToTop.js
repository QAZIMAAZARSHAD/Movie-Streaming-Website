$(document).ready(function () {
  var scrollTopButton = document.getElementById("scrollToTopButton");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollTopButton.style.display = "block";
    } else {
      scrollTopButton.style.display = "none";
    }
  }

  $("#scrollToTopButton").click(function () {
    $("html ,body").animate({ scrollTop: 0 }, 800);
  });
});
