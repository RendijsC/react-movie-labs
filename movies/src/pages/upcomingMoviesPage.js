// import React, { useState, useEffect } from "react";
// import PageTemplate from '../components/templateMovieListPage';
// import { getUpcomingMovies } from "../api/tmdb-api"
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

// const UpcomingMoviesPage = (props) => {
//   const [movies, setMovies] = useState([]);
//   const favorites = movies.filter(m => m.favorite)
//   localStorage.setItem('favorites', JSON.stringify(favorites))

  
//   useEffect(() => {
//     getUpcomingMovies().then(movies => {
//       setMovies(movies);
//     });
//   }, []);

//   return (
//     <PageTemplate
//       title='Upcoming Movies'
//       movies={movies}
//       action={(movie) => {
//         return <PlaylistAddIcon movie={movie} />;
//       }}
      
//     />
//   );
// };
// export default UpcomingMoviesPage;

import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = (props) => {
  const { data, error, isLoading, isError } = useQuery(
    "upcomingMovies",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;