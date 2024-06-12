
import { useQuery } from "@tanstack/react-query";
import { fetchSimilar } from "../actions/api/apiCalls";
import { ItrendingResponse } from "../types/movieData.types";

const SimilarDataQuery = (id: string | undefined, type : string | undefined) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchSimilar({id,type}),
      queryKey: ['fetchSimilarDataQuery',id],
    });
  };
  
  export default SimilarDataQuery;