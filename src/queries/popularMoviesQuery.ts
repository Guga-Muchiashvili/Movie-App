import { useQuery } from "@tanstack/react-query";
import { fetchTrendingElements } from "../api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const usePopularMoviesQuery = () => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchTrendingElements(),
      queryKey: ['usePopularMoviesQuery',],
    });
  };
  
  export default usePopularMoviesQuery;