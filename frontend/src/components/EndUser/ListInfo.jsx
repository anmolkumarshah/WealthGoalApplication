import React from "react";

function ListInfo({ name, number }) {
  return (
    <div className="flex px-1 py-1 border-b-2 border-gray-300 justify-between ">
      <div className="text-white font-semibold">{name}</div>
      <div className="text-white font-semibold">{number}</div>
    </div>
  );
}

export default ListInfo;
