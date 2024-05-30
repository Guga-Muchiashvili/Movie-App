import { useQuery } from "@tanstack/react-query";
import { fetchMovieList, fetchPopularMovies, fetchTrendingElements } from "../api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const useMovieListQuery = ({page, type} : any) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchMovieList({page, type}),
      queryKey: ['useMovieListQuery', page, type],
    });
  };
  
  export default useMovieListQuery;