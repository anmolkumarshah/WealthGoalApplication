import React from "react";
import Badge from "../common/Badge";
import { MdMarkEmailUnread } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AdvisorCard({ personalData, loginData }) {
  useNonAuthRedirect();
  return (
    <div className="flex flex-col">
      <div className="w-full mx-auto mb-1  bg-zinc-800 text-white rounded-lg overflow-hidden border-2 ">
        <div className="p-4 font-light">
          <p className="flex justify-between items-center">
            <span className="font-medium text-lg">{personalData?.name}</span>
            <Badge>{loginData?.userType}</Badge>
          </p>
          <p className="flex items-center">
            <MdMarkEmailUnread /> <p className="ml-2">{loginData?.email}</p>
          </p>
          <p className="flex items-center">
            <BiSolidPhoneCall /> <p className="ml-2">{personalData?.phone}</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdvisorCard;
