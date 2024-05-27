import { useQuery } from "@tanstack/react-query";
import { fetchTrendingElements } from "../api/apiCalls";

const useTrendingListQuery = () => {
    return useQuery({
      queryFn: () => fetchTrendingElements(),
      queryKey: ['useTrendingListQuery',],
    });
  };
  
  export default useTrendingListQuery;