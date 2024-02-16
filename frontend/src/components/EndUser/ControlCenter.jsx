import React from "react";
import ExpenseCard from "../Expense/ExpenseCard";
import SubordinateCard from "../subordinate/SubordinateCard";
import InvestmentCard from "../investment/InvestmentCard";
import GoalCard from "../goal/GoalCard";
import UpdatedPlanNotification from "./UpdatedPlanNotification";
import AdviseFeedback from "./AdviseFeedback";
import Quotes from "./Quotes";

function ControlCenter() {
  return (
    <div className="flex flex-col   md:w-3/4">
      <div className="w-full  h-100  flex flex-col md:flex-row px-3 ">
        <ExpenseCard />
        <GoalCard />
        <SubordinateCard />
        <InvestmentCard />
      </div>
      <Quotes />
      <AdviseFeedback />
    </div>
  );
}

export default ControlCenter;
