type Movie = {
  id: string;
  title: string;
};

class Exercise3Lab15 {
  private movies: Map<string, Movie[]> = new Map();

  add_genre(genre: string): boolean {
    if (this.movies.has(genre)) return false;
    this.movies.set(genre, []);
    return true;
  }

  add_movie_in_genre(genre: string, new_movie: Movie): boolean {
    const movies = this.movies.get(genre);
    if (!movies) return false;
    if (movies.some((movie) => movie.id === new_movie.id)) return false;
    movies.push(new_movie);
    this.movies.set(genre, movies);
    return true;
  }

  update_movie_title_by_genre_and_movie_id(
    genre: string,
    movie_id: string,
    new_title: string
  ): boolean {
    const moviesByGenre = this.movies.get(genre);
    if (!moviesByGenre) return false;
    const chosenMovie = moviesByGenre.find((item) => item.id === movie_id);
    if (!chosenMovie) return false;
    chosenMovie.title = new_title;
    return true;
  }

  delete_movie_by_genre_and_movie_id(
    genre: string,
    movie_id: string
  ): boolean {
    const movies = this.movies.get(genre);
    if (!movies || movies.every((movie) => movie.id !== movie_id)) return false;
    this.movies.set(
      genre,
      movies.filter((item) => item.id !== movie_id)
    );
    return true;
  }

  get_movie_title_by_id(genre: string, movie_id: string): string {
    const movie = this.movies.get(genre)?.find((movie) => movie.id === movie_id);
    return movie?.title || "Cannot find this movie";
  }
}

const b = new Exercise3Lab15();
b.add_genre("thriller");
b.add_movie_in_genre("thriller", { id: "1", title: "The American" });
b.add_movie_in_genre("thriller", { id: "12", title: "The Mexican" });

console.log(b.get_movie_title_by_id("thriller", "1"));  
console.log(
  b.update_movie_title_by_genre_and_movie_id("thriller", "1", "The A")
); 
console.log(b.get_movie_title_by_id("thriller", "1"));  
console.log(b.get_movie_title_by_id("thriller", "12")); 
console.log(b.delete_movie_by_genre_and_movie_id("thriller", "12")); 
console.log(b.get_movie_title_by_id("thriller", "12")); 
