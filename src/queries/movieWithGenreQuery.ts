import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchMovieList, fetchPopularMovies, fetchTrendingElements, fetchWithGenre } from "../actions/api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const movieWithGenreQuery = ({id} : any) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchWithGenre({id}),
      queryKey: ['movieWithGenreQuery',id, ],
    });
  };
  
  export default movieWithGenreQuery;