function isValidMovie(movie) {
  /*
  movie.releaseDate = new Date(data.releaseDate);
  movie.awards = data.awards;
  movie.countries = data.countries;
  movie.keywords = data.keywordList;
  movie.trailerLink = trailerData.linkEmbed;
  movie.images = imgData.items;
  movie.typeList
  */
  isValidRating(movie.rating);
  isValidString(movie.casts);
  isValidString(movie.imdbId);
  isValidString(movie.name);
  isValidString(movie.directors);
  isValidString(movie.writers);
  isValidString(movie.languages);
  isValidString(movie.runtime);
  isValidString(movie.poster);
  isValidString(movie.poster);
}

function isValidString(s) {
  if (typeof s === "string") {
    s = s.trim();
    if (s.length === 0) throw "Empty string!";
    else return s;
  } else throw `Wrong type. ${s} is not string.`;
}

function isValidRating(rating) {
  if (typeof rating !== "number")
    throw "Wrong type. Rating must be type of number.";
  if (rating < 0 || rating > 5) throw "Invalied rating, must in range of 1~5";
  return Number(rating.toFixed(1));
}

module.exports = {
  isValidMovie,
  isValidString,
  isValidRating,
};