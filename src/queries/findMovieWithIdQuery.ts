import { useQuery } from "@tanstack/react-query";
import { fetchMovidewithId, fetchTrendingElements } from "../actions/api/apiCalls";
import { IMovieDetails, ImovieData, ItrendingResponse } from "../types/movieData.types";

const fetchMovideWithId = (id:  string | undefined, type : string | undefined) => {
    return useQuery<IMovieDetails | {status_code : number, status_message : string, success : boolean}>({
      queryFn: () => fetchMovidewithId({id, type}),
      queryKey: ['fetchMovideWithId',id],
    });
  };
  
  export default fetchMovideWithId;