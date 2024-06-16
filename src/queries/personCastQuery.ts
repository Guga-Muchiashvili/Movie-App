import { useQuery } from "@tanstack/react-query";
import { ICredits } from "../types/movieData.types";
import { fetchPersonsCasts } from "../actions/api/apiCalls";


const usePersonCastList = (id : string | undefined) => {
    return useQuery<ICredits>({
      queryKey: ['usePersonCastList', id],
      queryFn: async () => {
        const data = await fetchPersonsCasts(id);
        return data;
      },
    });
  };
  
  export default usePersonCastList;