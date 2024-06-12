
import { useQuery } from "@tanstack/react-query";
import { fetchMovidewithId, } from "../actions/api/apiCalls";
import { IMovieDetails,  } from "../types/movieData.types";

const FetchMovideWithId = (id:  string | undefined, type : string | undefined) => {
    return useQuery<IMovieDetails>({
      queryFn: () => fetchMovidewithId({id, type}),
      queryKey: ['fetchMovideWithId',id, type],
    });
  };
  
  export default FetchMovideWithId;