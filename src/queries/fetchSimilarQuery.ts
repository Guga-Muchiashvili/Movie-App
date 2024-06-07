
import { useQuery } from "@tanstack/react-query";
import { fetchSimilar } from "../api/apiCalls";
import { ICredits, ImovieData, ItrendingResponse } from "../types/movieData.types";

const SimilarDataQuery = (id: string, type : string) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchSimilar({id,type}),
      queryKey: ['fetchSimilarDataQuery',id],
    });
  };
  
  export default SimilarDataQuery;