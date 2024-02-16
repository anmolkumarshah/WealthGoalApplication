import React from "react";
import ControlCenter from "./ControlCenter";
import Info from "./Info";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function UserDashBoard() {
  useNonAuthRedirect();

  return (
    <div
      style={{
        backgroundImage: `url(${"https://i.pinimg.com/564x/52/11/33/5211331c3267926037327cb79eab9bd8.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center md:flex-row p-4">
        <Info />
        <ControlCenter />
      </div>
    </div>
  );
}

export default UserDashBoard;
