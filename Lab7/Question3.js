class Exercise3 {
  #movies = new Map();
  //key is the genre: string, value is array of movies
  // example: { thriller: [{ id: '1', title: 'The American'}, { id: '2', title: 'Arcadian'}] }
  add_genre(genre) {
    // add genre if genre does not exist
    if (this.#movies.has(genre)) return false;
    this.#movies.set(genre, []);
    // return true if the genre is added successfully, false otherwise
    return true;
  }
  add_movie_in_genre(genre, new_movie) {
    // add movie if movie id does not exist
    const movies = this.#movies.get(genre);
    if (movies.some((movie) => movie.id === new_movie.id)) return false;
    movies.push(new_movie);
    this.#movies.set(genre, movies);
    // return true if the movie is added successfully, false otherwise
    return true;
  }
  update_movie_title_by_genre_and_movie_id(genre, movie_id, new_title) {
    // update a movie within a certain genre
    const moviesByGenre = this.#movies.get(genre);
    const chosenMovie = moviesByGenre.find((item) => item.id === movie_id);
    if (!chosenMovie) return false;
    chosenMovie.title = new_title;
    // return true if the movie's title is updated successfully, false otherwise
    return true;
  }
  delete_movie_by_genre_and_movie_id(genre, movie_id) {
    console.log(this.#movies.get(genre));
    if (this.#movies.get(genre).every((movie) => movie.id !== movie_id))
      return false;
    // delete movie
    this.#movies.set(
      genre,
      this.#movies.get(genre).filter((item) => item.id !== movie_id)
    );
    // return true if the movie is delete successfully, false otherwise
    return true;
  }
  get_movie_title_by_id(genre, movie_id) {
    // return the movie title
    return (
      this.#movies.get(genre).find((movie) => movie.id === movie_id)?.title ||
      "Cannot find this movie"
    );
  }
}

const a = new Exercise3();
a.add_genre("thriller");
a.add_movie_in_genre("thriller", { id: "1", title: "The American" });
a.add_movie_in_genre("thriller", { id: "12", title: "The Mexican" });
console.dir(a);
console.log(a.get_movie_title_by_id("thriller", "1"));
console.log(
  a.update_movie_title_by_genre_and_movie_id("thriller", "1", "The A")
);
console.log(a.get_movie_title_by_id("thriller", "1"));
console.log(a.get_movie_title_by_id("thriller", "12"));
console.log(a.delete_movie_by_genre_and_movie_id("thriller", "12"));
console.log(a.get_movie_title_by_id("thriller", "12"));
