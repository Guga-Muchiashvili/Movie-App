import { useQuery } from "@tanstack/react-query";
import { fetchMovieList, fetchPopularMovies, fetchTrendingElements } from "../actions/api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const useMovieListQuery = ({page, type, mut} : {page : number | undefined, type : string | undefined, mut : string | undefined}) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchMovieList({page, type, mut}),
      queryKey: ['useMovieListQuery', page, type, mut],
    });
  };
  
  export default useMovieListQuery;