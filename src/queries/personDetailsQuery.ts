import { useQuery } from "@tanstack/react-query";
import { fetchPerson } from "../actions/api/apiCalls";

const usePersonDetails = (id : string | undefined) => {
    return useQuery({
      queryKey: ['usePersonDetails', id],
      queryFn: async () => {
        const data = await fetchPerson(id);
        return data
      },
    });
  };
  
  export default usePersonDetails;