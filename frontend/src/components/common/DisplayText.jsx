import React from "react";

function DisplayText({ children }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-5xl text-gray-200  border-dashed rounded-md p-1 border-4 capitalize">
        {children}
      </div>
    </div>
  );
}

export default DisplayText;
