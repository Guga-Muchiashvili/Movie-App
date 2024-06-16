
import { useQuery } from "@tanstack/react-query";
import { fetchWithFilter } from "../actions/api/apiCalls";
import { IFilterForm, ItrendingResponse } from "../types/movieData.types";


const MovieFilterQuery = ({filteredData, page} : {filteredData : IFilterForm, page : number}) => {
    return useQuery<ItrendingResponse>({
      queryFn: () => fetchWithFilter({...filteredData, page}),
      queryKey: ['fetchMovieFilterQuery',filteredData, page],
    });
  };
  
  export default MovieFilterQuery;