import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchTrendingElements, fetchUpcomingMovies } from "../actions/api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const upcommingMoviesQuery = () => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchUpcomingMovies(),
      queryKey: ['upcommingMoviesQuery',],
    });
  };
  
  export default upcommingMoviesQuery;