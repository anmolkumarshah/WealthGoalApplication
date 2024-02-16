import React from "react";

function LandingPage() {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 1)), url("https://cdn.pixabay.com/photo/2014/10/23/10/10/dollars-499481_640.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Ensure the full height of the viewport
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="text-white"
      >
        <div className="text-2xl md:text-7xl font-extrabold capitalize font-serif">
          Take control of your money
        </div>
        <div className="w-1/2 text-center mt-4 text-lg font-extralight">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non delectus
          exercitationem officia sunt harum qui, magnam consequuntur
          consectetur.
        </div>
        <div className="py-4 px-5 bg-blue-400 rounded-md my-3 text-lg font-semibold capitalize cursor-pointer">
          Get Started
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:px-5 my-5">
        <Card
          imageUrl="https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_640.jpg"
          title="Manage Expense"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non delectus"
        />
        <Card
          imageUrl="https://cdn.pixabay.com/photo/2015/01/28/22/20/bookkeeping-615384_640.jpg"
          title="Track Your Goal"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non delectus"
        />
        <Card
          imageUrl="https://cdn.pixabay.com/photo/2016/10/06/03/30/man-1718099_640.jpg"
          title="Manage Investments"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non delectus"
        />
      </div>
    </>
  );
}

const Card = ({ imageUrl, title, description }) => (
  <div
    className="relative flex flex-col items-center justify-end h-64 p-6 bg-cover bg-center bg-gradient-to-b from-transparent to-gray-800 text-white rounded-lg shadow-lg overflow-hidden mb-8 mx-4 sm:w-full sm:flex-1 sm:mx-2"
    style={{
      backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.4), rgba(71, 71, 85, 1)), url("${imageUrl}")`,
    }}
  >
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-center">{description}</p>
  </div>
);

export default LandingPage;
