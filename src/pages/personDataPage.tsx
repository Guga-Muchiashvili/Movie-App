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
      <div className="w-full h-2/3 flex flex-col  lg:flex-row items-center justify-center">
        <div className="w-full bg-green h-2/3 flex justify-center md:justify-start items-center px-2 md:px-10 lg:px-24 py-20 gap-6 bg-[#15141F] ">
          <img className="md:w-44 md:h-44 h-32 w-32 rounded-full shadow-md shadow-black" src={`https://image.tmdb.org/t/p/original/${personData?.profile_path}`} alt="" />
          <div className="flex flex-col text-white font-bold font-roboto text-xl gap-5">
            <h2 className="font-oswalid text-xl md:text-4xl" style={{textShadow : "2px 2px 2px black"}}>
              {personData?.name}
            </h2>
            <h2 className="flex gap-2 font-oswalid text-xl md:text-3xl" style={{textShadow : "2px 2px 2px black"}}>

            birth Date : <h1 className="text-gray-300">
              {personData?.birthday || 'unknwon'}
              </h1>
              
            </h2>
          </div>
        </div>
        <div className="pr-20">
          <input type="text" />
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
