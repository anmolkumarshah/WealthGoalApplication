import React from "react";
import pageNotFoundImage from "../../asset/pageNotFound.png";
import { useNavigate, useRouteError } from "react-router-dom";

function NotFoundPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  //   console.log(error);
  return (
    <div className=" container mx-auto flex flex-col md:flex-row justify-center items-center px-4 py-16 md:px-16 md:py-24 bg-white">
      <img
        src={pageNotFoundImage}
        alt="Page Not Found"
        className="w-26 h-26 md:w-3/4 mb-8 mx-auto"
      />
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl  text-gray-400 font-bold mb-8">
          Error Code : {error?.status}
        </h1>
        <h1 className="text-3xl mb-8">Oops....!!</h1>
        <h2 className="text-3xl mb-8">
          This is not the page you're looking for.
        </h2>
        <p className="text-lg text-gray-500">{error?.data}</p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-4 rounded-full font-bold hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
