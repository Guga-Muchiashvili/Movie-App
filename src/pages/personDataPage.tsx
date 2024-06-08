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


  return (
    <div className="w-full h-[100vh] flex flex-col">
      <NavBar />
      <div className="w-full h-2/3 bg-red-600">

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
