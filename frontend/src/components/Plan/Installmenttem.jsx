import React from "react";

function Installmenttem({ amount, date, idx }) {
  return (
    <div className="cursor-pointer flex justify-between items-center bg-amber-100 border-2 border-black border-dashed rounded-md mx-1 my-1 p-2 font-mono text-xs min-w-[100px] w-100">
      <div className="bg-black text-white rounded-full p-1 ">{idx}</div>
      <div className="flex flex-col items-center">
        <div>₹ {amount}</div>
        <div className="text-xs">{date}</div>
      </div>
    </div>
  );
}

export default Installmenttem;
