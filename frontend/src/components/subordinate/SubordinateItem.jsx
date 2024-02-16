import React from "react";
import Badge from "../common/Badge";
import { MdDelete } from "react-icons/md";

function SubordinateItem({ data, remove }) {
  return (
    <div
      key={data?.id}
      className="flex px-3 py-1 rounded-md border-2 bg-blue-50 items-center justify-between mb-1"
    >
      <Badge>{data?.relation}</Badge>
      <div className="font-mono text-xs">{data?.name}</div>
      <div>
        {new Date().getFullYear() - new Date(data?.dob).getFullYear()} yr.{" "}
      </div>
      {remove != null ? (
        <div onClick={() => remove(data?.id)} className="cursor-pointer">
          <MdDelete />
        </div>
      ) : null}
    </div>
  );
}

export default SubordinateItem;
