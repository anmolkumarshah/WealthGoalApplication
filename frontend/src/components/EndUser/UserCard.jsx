import React from "react";
import Badge from "../common/Badge";
import UserAdvisor from "./UserAdvisor";
import { MdMarkEmailUnread } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FaRegAddressBook } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import UpdatedPlanNotification from "./UpdatedPlanNotification";
import { MdEdit } from "react-icons/md";
import EditJobInfo from "./EditJobInfo";

function UserCard({ personalData, loginData, incomeData }) {
  return (
    <div className="flex flex-col">
      <div className="w-full mx-auto mb-1 bg-zinc-800 text-white rounded-lg overflow-hidden border-2 ">
        <div className="p-4 font-light">
          <p className="flex justify-between items-center">
            <span className="font-medium text-lg">{personalData?.name}</span>
            <Badge>{loginData?.userType}</Badge>
          </p>
          <p className="flex items-center">
            <MdMarkEmailUnread /> <p className="ml-2">{loginData?.email}</p>
          </p>
        </div>
      </div>
      <div className="w-full my-1 mx-auto bg-zinc-800 text-white rounded-lg overflow-hidden border-2  ">
        <div className="p-4 font-light">
          <p className="flex items-center">
            <CgCalendarDates /> <p className="ml-2">{personalData?.dob}</p>
          </p>
          <p className="flex items-center">
            <FaRegAddressBook /> <p className="ml-2">{personalData?.address}</p>
          </p>
          <p className="flex items-center">
            <BiSolidPhoneCall /> <p className="ml-2">{personalData?.phone}</p>
          </p>
        </div>
      </div>
      <div className="relative w-full mx-auto my-1 bg-zinc-800 text-white rounded-lg overflow-hidden border-2">
        <EditJobInfo
          incomeSource={incomeData?.incomeSource}
          monthlySalary={incomeData?.monthlySalary}
          employmentType={incomeData?.employmentType}
        />
        <div className="p-4">
          <p className="flex items-center">
            <GiPayMoney /> <p className="ml-2"> {incomeData?.incomeSource}</p>
          </p>
          <p className="flex items-center">
            <GiTakeMyMoney />{" "}
            <p className="ml-2">₹ {incomeData?.monthlySalary}</p>{" "}
          </p>
          <p className="flex items-center">
            <MdWork /> <p className="ml-2">{incomeData?.employmentType}</p>
          </p>
        </div>
      </div>

      <UpdatedPlanNotification />
      {loginData?.userType != "EXTERNAL" ? <UserAdvisor /> : null}
    </div>
  );
}

export default UserCard;
