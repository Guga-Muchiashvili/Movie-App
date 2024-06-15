import { useQuery } from "@tanstack/react-query";
import {  fetchWithGenre } from "../actions/api/apiCalls";
import { ItrendingResponse } from "../types/movieData.types";

const MovieWithGenreQuery = ({id, page} : {id : string | undefined, page : number}) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchWithGenre({id, page}),
      queryKey: ['movieWithGenreQuery',id,page ],
    });
  };
  
  export default MovieWithGenreQuery;