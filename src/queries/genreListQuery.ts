import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchMovieList, fetchPopularMovies, fetchTrendingElements } from "../actions/api/apiCalls";
import { ImovieData, ItrendingResponse } from "../types/movieData.types";

const useGenreListQuery = ({type} : {type : string}) => {
    return useQuery<{genres : [{id : number, name : string}]}>({
      queryFn: () => fetchGenres({type, }),
      queryKey: ['useGenreListQuery',type, ],
    });
  };
  
  export default useGenreListQuery;