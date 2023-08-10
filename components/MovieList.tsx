"use client";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import MovieCard from "./MovieCard";

type Props = {
  title: string;
};
const MovieList = (props: Props) => {
  const [movies, setMovies] = useState<any>([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) {
          console.log("Failed to fetch movies");
        }
        const movies = await res.json();
        setMovies(movies);
        return movies;
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  if (isEmpty(movies)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {props.title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
