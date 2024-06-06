import { useQuery } from "@tanstack/react-query";
import { fetchMovidewithId, fetchTrendingElements } from "../api/apiCalls";
import { IMovieDetails, ImovieData, ItrendingResponse } from "../types/movieData.types";

const fetchMovideWithId = (id:  string, type : string) => {
    return useQuery<IMovieDetails>({
      queryFn: () => fetchMovidewithId({id, type}),
      queryKey: ['fetchMovideWithId',id],
    });
  };
  
  export default fetchMovideWithId;