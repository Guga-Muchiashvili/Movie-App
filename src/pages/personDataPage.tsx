import React from "react";
import { useParams } from "react-router";
import usePersonDetails from "../queries/personDetailsQuery";
import usePersonCastList from "../queries/personCastQuery";
import NavBar from "../components/navBarComponent";
import SliderElement from "../components/sliderComponent";

const PersonDataPage = () => {
  const { id } = useParams();
  const { data: personData } = usePersonDetails(id);
  const { data: castMovies } = usePersonCastList(id);


  console.log(personData)
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <NavBar />
      <div className="w-full h-2/3 flex items-center justify-center">
        <div className="w-full bg-green h-2/3 flex items-center px-2 md:px-10 lg:px-24 py-20 gap-6 bg-[#15141F] ">
          <img className="w-36 h-36 rounded-full" src={`https://image.tmdb.org/t/p/original/${personData?.profile_path}`} alt="" />
          <div className="flex flex-col text-white font-bold font-roboto text-xl gap-5">
            <h2>
              {personData?.name}
            </h2>
            <h2>

            birth Date : {personData?.birthday}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="h-80 relative">
         {castMovies && <SliderElement type="movie" isDetail={true}  data={castMovies.cast} /> } 
        </div>
      </div>
    </div>
  );
};

export default PersonDataPage;
