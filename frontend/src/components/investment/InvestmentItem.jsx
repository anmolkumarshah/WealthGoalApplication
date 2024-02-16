import { Badge } from "@radix-ui/themes";
import React from "react";

function InvestmentItem({ data }) {
  return (
    <div
      key={data?.instId}
      className="flex flex-wrap px-3 py-1 rounded-md border-2 bg-neutral-50 items-center justify-between mb-1"
    >
      <Badge color="red">{data?.priority}</Badge>
      <Badge color="yellow">{data?.category}</Badge>
      <div className="font-mono text-xs">{data?.description}</div>
      <div>₹ {data?.amount}</div>
    </div>
  );
}

export default InvestmentItem;
