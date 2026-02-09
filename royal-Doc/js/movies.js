const API_KEY = "062bcc9b48ab978c0239a6820c2b9ec8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieList = document.getElementById("movieList");
const bollywoodList = document.getElementById("bollywoodList");
const hollywoodList = document.getElementById("hollywoodList");



// ===== POPULAR MOVIES =====
async function getMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const data = await response.json();
    showMovies(data.results);

  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}

function showMovies(movies) {
  movieList.innerHTML = "";

  movies.slice(0, 8).forEach(movie => {

    const poster = movie.poster_path
      ? IMAGE_URL + movie.poster_path
      : "https://via.placeholder.com/300x450?text=No+Image";

    movieList.innerHTML += `
     <div class="card">
  <img src="${poster}" alt="${movie.title}">

  <div class="card-overlay">
    <button class="trailer-btn"
      onclick="playTrailer(${movie.id})">
      ▶ Watch Trailer
    </button>
  </div>

  <div class="card-content">
    <p class="movie-name">${movie.title}</p>
    <p>⭐ ${movie.vote_average}</p>
  </div>
</div>

    `;
  });
}


// ===== BOLLYWOOD =====
async function getBollywoodMovies() {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&with_origin_country=IN&sort_by=popularity.desc&page=1`
  );

  const data = await response.json();
  showExtraMovies(data.results, bollywoodList);
}


// ===== HOLLYWOOD =====
async function getHollywoodMovies() {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&with_origin_country=US&sort_by=popularity.desc&page=1`
  );

  const data = await response.json();
  showExtraMovies(data.results, hollywoodList);
}






// ===== COMMON FUNCTION =====
function showExtraMovies(movies, container) {

  container.innerHTML = "";

  movies.slice(0, 8).forEach(movie => {

    const poster = movie.poster_path
      ? IMAGE_URL + movie.poster_path
      : "https://via.placeholder.com/300x450?text=No+Image";

    container.innerHTML += `
     <div class="card">
  <img src="${poster}" alt="${movie.title}">

  <div class="card-overlay">
    <button class="trailer-btn"
      onclick="playTrailer(${movie.id})">
      ▶ Watch Trailer
    </button>
  </div>

  <div class="card-content">
    <p class="movie-name mt-2">${movie.title}</p>
       <p class="release-date "> ${new Date(movie.release_date).toDateString()}</p>
    <p class="vote">⭐ ${movie.vote_average}</p>
  </div>
</div>

    `;
  });
}

getMovies();
getBollywoodMovies();
getHollywoodMovies();





async function playTrailer(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer = data.results.find(
      vid => vid.type === "Trailer" && vid.site === "YouTube"
    );

    if (!trailer) {
      alert("Trailer not available");
      return;
    }

    const iframe = document.getElementById("trailerFrame");
   iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;


    document.getElementById("trailerModal").style.display = "flex";

  } catch (error) {
    console.log("Trailer error:", error);
  }
}

function closeTrailer() {
  document.getElementById("trailerModal").style.display = "none";
  document.getElementById("trailerFrame").src = "";
}
