import { useState } from "react";

import css from "./App.module.css";

import toast, { Toaster } from "react-hot-toast";

import { type Movie } from "../../types/movie";
import { fetchTmdb } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSubmit = async (query: string) => {
    try {
      const results = await fetchTmdb(query);

      if (results.length > 0) {
        setMovies(results);
      } else {
        toast.error("No movies found for your request.");
      }
    } catch {
      toast.error("Something went wrong...");
    }
  }

  const handleSelect = (event: React.MouseEvent<HTMLLIElement>): void => {
    console.log(event.target);
  }

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />}
    </div>
  );
}