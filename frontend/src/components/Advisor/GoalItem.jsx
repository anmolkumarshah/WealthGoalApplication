import React from "react";
import Badge from "../common/Badge";
import { useNavigate } from "react-router-dom";
import { inWordCurrency, truncateDescription } from "../../util";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

const GoalItem = ({ goal, fetchCb }) => {
  useNonAuthRedirect();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/advisor/goal/${goal.goalId}`)}
      className="border-2 border-white text-white p-4 rounded-lg shadow-lg  items-center justify-between mb-4 m-2 cursor-pointer  bg-sky-700 "
    >
      <div className="flex justify-between">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-2">{goal.goalTitle}</h2>
          <p className="text-black-600">
            {truncateDescription(goal.goalDescription, 30)}
          </p>
        </div>
        <div className="flex flex-col items-end w-2/3">
          <div className="mb-2">
            <span className="text-black-600">
              Priority: <Badge>{goal.goalPriority}</Badge>
            </span>
            <span className="text-black-600">
              Status: <Badge>{goal.goalStatus}</Badge>
            </span>
          </div>

          <div>
            <span className="text-black-600">Amount:</span> ₹ {goal.goalAmount}
          </div>
          <div>{inWordCurrency(goal.goalAmount)}</div>
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
