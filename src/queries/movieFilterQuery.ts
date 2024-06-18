import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchWithKeyword } from "../actions/api/apiCalls";


const useMovieWithKeyword = ({keyword} : {keyword : string | undefined}) => {
    return useQuery<any>({
      queryFn: () => fetchWithKeyword(keyword),
      queryKey: ['useMovieWithKeyword',keyword],
    });
  };
  
  export default useMovieWithKeyword;