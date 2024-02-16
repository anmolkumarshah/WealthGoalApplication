import React, { useState } from "react";
import { inWordCurrency } from "../../util";
import JourneyList from "./JourneyList";
import GoalCompletionLineGraph from "./GoalCompletionLineGraph";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function GoalJourneyCard({ el }) {
  useNonAuthRedirect();
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <div className="flex-col">
      <div className="flex flex-col md:flex-row my-2 ">
        <div
          onClick={handleToggle}
          style={{
            backgroundImage: `url(${"https://i.pinimg.com/564x/09/ce/09/09ce0942622f04f8e2d22604f1b8f9fd.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="text-white bg-gradient-to-r cursor-pointer from-amber-200 to-amber-300 rounded-lg border-blue-950  border-2 w-100 md:w-1/4 flex flex-col items-center justify-center p-3 text-center"
        >
          <div className="text-lg font-serif font-bold mb-2">
            {el?.goalTitle}
          </div>
          <div className="text-sm font-mono">₹ {el?.goalAmount}</div>
          <div className="text-xs font-bold ">
            {inWordCurrency(el?.goalAmount)}
          </div>
        </div>
        <JourneyList goalId={el?.goalId} />
      </div>
      {show ? (
        <div className="h-100 w-full">
          <GoalCompletionLineGraph goalId={el?.goalId} />
        </div>
      ) : null}
    </div>
  );
}

export default GoalJourneyCard;
