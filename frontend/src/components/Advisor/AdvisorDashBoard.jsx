import React from "react";
import AdvisorInfo from "./AdvisorInfo";
import AllAssignedUser from "./AllAssignedUser";
import AllGoals from "./AllGoals";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AdvisorDashBoard() {
  useNonAuthRedirect();
  return (
    <div
      style={{
        backgroundImage: `url(${"https://cdn.pixabay.com/photo/2017/03/25/17/55/colorful-2174045_1280.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row p-4 justify-evenly">
        <AdvisorInfo />
        <AllAssignedUser />
        <AllGoals />
      </div>
    </div>
  );
}

export default AdvisorDashBoard;
