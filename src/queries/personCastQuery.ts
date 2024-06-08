import { useQuery } from "@tanstack/react-query";
import personImageQuery from "../queries/peopleImageQuery";
import { fetchPersomImages, fetchPersonsCasts } from "../actions/api/apiCalls";


const usePersonCastList = (id : string | undefined) => {
    return useQuery({
      queryKey: ['usePersonCastList', id],
      queryFn: async () => {
        const data = await fetchPersonsCasts(id);
        return data;
      },
    });
  };
  
  export default usePersonCastList;