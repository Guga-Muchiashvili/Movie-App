import { useQuery } from "@tanstack/react-query";
import { fetchCountryList, fetchCreditswithMovide, fetchMovidewithId,  } from "../actions/api/apiCalls";
import { ICredits, ImovieData, ItrendingResponse } from "../types/movieData.types";

const useCountryListQuery = () => {
    return useQuery<{iso_3166_1 : string, english_name : string, native_name : string}[]>({
      queryFn: () => fetchCountryList(),
      queryKey: ['fetchuseCountryListQuery',],
    });
  };
  
  export default useCountryListQuery;