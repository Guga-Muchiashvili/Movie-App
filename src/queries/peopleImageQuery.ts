import { useQuery } from "@tanstack/react-query";
import personImageQuery from "../queries/peopleImageQuery";
import { fetchPersomImages } from "../actions/api/apiCalls";


const usePersonImages = (ids : number[]) => {
    return useQuery({
      queryKey: ['personImages', ids],
      queryFn: async () => {
        const images = await Promise.all(ids.map(id => fetchPersomImages({id})));
        return images;
      },
      enabled: ids.length > 0,
    });
  };
  
  export default usePersonImages;