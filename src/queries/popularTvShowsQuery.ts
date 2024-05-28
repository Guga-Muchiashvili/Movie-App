import { useQuery } from "@tanstack/react-query";
import { fetchPopularTvSeries, fetchTrendingElements } from "../api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const usePopularTvShowsQuery = () => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchPopularTvSeries(),
      queryKey: ['usePopularTvShowsQuery',],
    });
  };
  
  export default usePopularTvShowsQuery;