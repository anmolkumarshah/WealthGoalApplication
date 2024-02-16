import { Badge } from "@radix-ui/themes";
import React from "react";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function GoalItem({ data }) {
  useNonAuthRedirect();
  return (
    <div key={data?.goalId}>
      <div className="flex flex-col h-full rounded-md mb-1 bg-neutral-50 p-2 border-2">
        <div className="flex px-3 py-1 rounded-md  bg-neutral-50 items-center justify-between mb-1">
          <div className=" text-xl">{data?.goalTitle}</div>
          <div className="font-mono text-xs">{data?.goalDescription}</div>
        </div>
        <div className="flex flex-wrap px-3 py-1 rounded-md  bg-neutral-50 items-center justify-between mb-1 font-mono text-sm">
          {/* <Badge color="red">{data?.goalPriority}</Badge> */}
          <Badge color="yellow">Status : {data?.goalStatus}</Badge>
          <div className=" font-mono">amount : ₹ {data?.goalAmount}</div>
          {/* <div>from: {data?.goalStartDate}</div>
          <div>to: {data?.goalEndDate}</div> */}
          {/* <div>Progress: {data?.goalProgress}%</div> */}
          {/* <div>Risk Factor: {data?.riskFactor}</div> */}
          <Badge color="pink">for : {data?.subordinate?.name}</Badge>
        </div>
      </div>
    </div>
  );
}

export default GoalItem;
