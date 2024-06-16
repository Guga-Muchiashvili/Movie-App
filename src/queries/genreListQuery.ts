import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../actions/api/apiCalls";


const useGenreListQuery = ({type} : {type : string | undefined}) => {
    return useQuery<{genres : [{id : number, name : string}]}>({
      queryFn: () => fetchGenres({type, }),
      queryKey: ['useGenreListQuery',type, ],
    });
  };
  
  export default useGenreListQuery;