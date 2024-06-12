import React from "react";
import capitalizeName from "../capitalizeName";
import { Link } from "react-router-dom";

function HomeCard({ img, name }) {
  return (
    <div className="w-full sm:w-1/2 lg:w-2/3 my-3 px-2">
      <div className="bg-white dark:bg-slate-800 rounded-lg border shadow-md overflow-hidden">
        <img
          src={img}
          className="w-full h-48 object-cover"
          alt={capitalizeName(name)}
        />
        <div className="p-4 text-center">
          <h5 className="text-xl font-semibold mb-2">{capitalizeName(name)}</h5>
          <Link
            to={`/${name}/login`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Let's Go
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
