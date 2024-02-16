import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import ListInfo from "../EndUser/ListInfo";
import NewSubordinate from "./NewSubordinate";
import AllSubordinate from "./AllSubordinate";

function SubordinateCard() {
  const [allData, setAllData] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/subordinate/${userId}`
      );
      if (allData.status === 200) {
        setAllData(allData.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-1  border-orange-950 border-4 rounded-xl  bg-fuchsia-900 w-100 md:w-1/4 my-3 mx-1  flex flex-col justify-between items-center">
      {allData == null ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full p-2">
            <ListInfo name="Total Subordinates" number={allData?.length} />
          </div>
          <div className="flex md:flex-col xl:flex-row  justify-between w-full px-3 py-3">
            <NewSubordinate fetchData={fetchData} />
            <AllSubordinate refresh={fetchData} />
          </div>
        </>
      )}
    </div>
  );
}

export default SubordinateCard;
