import React from "react";

function Button({ children, color, callBackFunction }) {
  color = color === "" || color == null ? "yellow" : color;
  return (
    <div
      onClick={() => callBackFunction()}
      className={`px-2  py-1 rounded-md bg-${color}-100 cursor-pointer border-2 text-center font-bold`}
    >
      {children}
    </div>
  );
}

export default Button;
