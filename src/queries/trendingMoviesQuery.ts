import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchTrendingElements } from "../api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const useTrendingListQuery = () => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchPopularMovies(),
      queryKey: ['useTrendingListQuery',],
    });
  };
  
  export default useTrendingListQuery;