import { useQuery } from "@tanstack/react-query";
import { fetchCreditswithMovide, fetchMovidewithId,  } from "../api/apiCalls";
import { ICredits, ImovieData, ItrendingResponse } from "../types/movieData.types";

const CreditswithMovide = (id  : string) => {
    return useQuery<ICredits>({
      queryFn: () => fetchCreditswithMovide({id}),
      queryKey: ['fetchCreditswithMovide',id],
    });
  };
  
  export default CreditswithMovide;