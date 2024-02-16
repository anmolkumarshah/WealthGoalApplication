import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { CgCalendarDates } from "react-icons/cg";
import { FaRegAddressBook } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdMarkEmailUnread } from "react-icons/md";
import Badge from "../common/Badge";

function UserAdvisor() {
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/advisor/${userId}`
      );
      if (allData.status === 200) {
        setdata(allData.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full mx-auto my-2 font-light bg-orange-400 text-white rounded-md overflow-hidden  ">
      {/* <div className="text-center p-2">Your Assigned Advisor</div> */}
      <div className="p-4 font-light">
        <p className="flex justify-between items-center">
          <span className="font-medium text-lg">{data?.name}</span>
          <Badge>{"Advisor"}</Badge>
        </p>
        <p className="flex items-center">
          <MdMarkEmailUnread /> <p className="ml-2">{data?.email}</p>
        </p>
        <p className="flex items-center">
          <BiSolidPhoneCall /> <p className="ml-2">{data?.phone}</p>
        </p>
      </div>
    </div>
  );
}

export default UserAdvisor;
