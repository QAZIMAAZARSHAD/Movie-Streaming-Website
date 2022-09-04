function getMovies(t) {
  axios
    .get("https://www.omdbapi.com/?apikey=8d5cb2e&s=" + t)
    .then((t) => {
      let e = t.data.Search,
        i = "";
      $.each(e, (t, e) => {
        i += `\n                <div class="col-md-3">\n                <div class="well text-center">\n                <img src="${e.Poster}">\n                <h5>${e.Title}</h5>\n                <a onclick="movieSelected('${e.imdbID}')" class ="btn btn-danger" href="#">Movie Details</a>\n                </div>\n                </div>\n                `;
      }),
        $("#movies").html(i);
    })
    .catch((t) => {});
}

function movieSelected(t) {
  return (
    sessionStorage.setItem("movieID", t),
    (window.location = "movie-min.html"),
    !1
  );
}

function getMovie() {
  let t = sessionStorage.getItem("movieID");
  axios
    .get("https://www.omdbapi.com/?apikey=8d5cb2e&i=" + t)
    .then((t) => {
      let e = t.data,
        i = `\n            <div class ="row">\n            <div class="col-md-4">\n            <img src="${e.Poster}" class='thumbnail'>\n            </div>\n            <div class="col-md-8">\n            <h2>${e.Title}</h2>\n            <ul class="list-group">\n            <li class="list-group-item"><strong>Genre:</strong>${e.Genre}</li>\n            <li class="list-group-item"><strong>Released:</strong>${e.Released}</li>\n            <li class="list-group-item"><strong>Rated:</strong>${e.Rated}</li>\n            <li class="list-group-item"><strong>ImdbRating:</strong>${e.imdbRating}</li>\n            <li class="list-group-item"><strong>Director:</strong>${e.Director}</li>\n            <li class="list-group-item"><strong>Writer:</strong>${e.Writer}</li>\n            <li class="list-group-item"><strong>Actors:</strong>${e.Actors}</li>\n            </ul>\n            </div>\n            </div>\n            <div class="row">\n            <div class="well">\n            <h3>Plot</h3>\n            \n            ${e.Plot}\n            \n            <hr>\n            <a href="http://imdb.com/title/${e.imdbID}" target="_blank" class="btn bg-danger">View IMDB</a>\n            <a href ="index.html" class="btn btn-danger">Go Back To Search</a>\n            </div>\n            </div>\n            `;
      $("#movie").html(i);
    })
    .catch((t) => {});
}
$(document).ready(() => {
  $("#searchForm").on("submit", (t) => {
    getMovies($("#searchText").val()), t.preventDefault();
  });
});
