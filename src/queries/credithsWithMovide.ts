import { useQuery } from "@tanstack/react-query";
import { fetchCreditswithMovide, fetchMovidewithId,  } from "../actions/api/apiCalls";
import { ICredits, ImovieData, ItrendingResponse } from "../types/movieData.types";

const CreditswithMovide = (id: string | undefined, type : string | undefined) => {
    return useQuery<ICredits>({
      queryFn: () => fetchCreditswithMovide({id,type}),
      queryKey: ['fetchCreditswithMovide',id],
    });
  };
  
  export default CreditswithMovide;