import React from "react";
import Badge from "../common/Badge";
import { MdDelete } from "react-icons/md";

function ExpenseItem({ data, removeExpense }) {
  return (
    <div
      key={data?.expId}
      className="flex px-3 py-1 rounded-md border-2 bg-orange-100 items-center justify-between mb-1"
    >
      <Badge color={data?.category === "NEED" ? "blue" : "red"}>
        {data?.category}
      </Badge>
      <div className="font-mono text-xs">{data?.description}</div>
      <div>₹ {data?.amount}</div>
      <div
        onClick={() => removeExpense(data?.expId)}
        className="cursor-pointer"
      >
        <MdDelete />
      </div>
    </div>
  );
}

export default ExpenseItem;
