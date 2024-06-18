import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import usePersonDetails from "../queries/personDetailsQuery";
import usePersonCastList from "../queries/personCastQuery";
import NavBar from "../components/navBarComponent";
import CardElement from "../elements/cardElement";
import { ICast } from "../types/movieData.types";

const PersonDataPage = () => {
  const { id } = useParams();
  const { data: personData } = usePersonDetails(id);
  const { data: castMovies } = usePersonCastList(id);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<ICast[]>([]);

  useEffect(() => {
    if (castMovies) {
      const filtered = castMovies.cast.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [castMovies, searchQuery]);

  return (
    <div className="w-full h-[100vh] flex flex-col">
      <NavBar />
      <div className="w-full h-2/3 flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full bg-green h-2/3 flex justify-center md:justify-start items-center px-2 md:px-10 lg:px-24 py-20 gap-6 bg-[#15141F]">
          <img
            className="md:w-32 md:h-32 h-28 w-28 rounded-full shadow-md shadow-black"
            src={`https://image.tmdb.org/t/p/original/${personData?.profile_path}`}
            alt=""
          />
          <div className="flex flex-col text-white font-bold font-roboto text-xl gap-5">
          <h2
              className="flex gap-2 font-oswalid text-xl md:text-2xl"
              style={{ textShadow: "2px 2px 2px black" }}
            >
              Name:{" "}
              <h1 className="text-gray-300">{personData?.name || "unknown"}</h1>
            </h2>
            <h2
              className="flex gap-2 font-oswalid text-xl md:text-2xl"
              style={{ textShadow: "2px 2px 2px black" }}
            >
              Birth Date:{" "}
              <h1 className="text-gray-300">{personData?.birthday || "unknown"}</h1>
            </h2>
          </div>
        </div>
        <div className=" justify-center lg:w-fit lg:px-10 w-full flex items-center ">
          <input

            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="p-2 rounded w-80 outline-none border-blue-500 border-2"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="h-fit py-5 flex flex-wrap w-full relative justify-center gap-5 px-5">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((item, i) => (
              <CardElement data={item} key={item.id} i={i} />
            ))
          ) : (
            <p className="text-white text-center">No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDataPage;
