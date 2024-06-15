
import { useQuery } from "@tanstack/react-query";
import { fetchSimilar, fetchWithFilter } from "../actions/api/apiCalls";
import { IFilterForm, ItrendingResponse } from "../types/movieData.types";

const MovieFilterQuery = ({data, page }: {data : IFilterForm, page : number}) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchWithFilter({...data, page}),
      queryKey: ['fetchMovieFilterQuery',data, page],
    });
  };
  
  export default MovieFilterQuery;