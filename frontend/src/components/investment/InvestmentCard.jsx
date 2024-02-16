import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import ListInfo from "../EndUser/ListInfo";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import NewInvestment from "./NewInvestment";
import AllInvestment from "./AllInvestment";

function InvestmentCard() {
  const [allData, setAllData] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/investment/${userId}`
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
    <div className="p-1  border-orange-950 border-4 rounded-xl  bg-emerald-900 w-100 md:w-1/4 my-3 mx-1  flex flex-col justify-between items-center">
      {allData == null ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full p-2">
            <ListInfo name="Total Investments" number={allData?.length} />
          </div>
          <div className="flex md:flex-col xl:flex-row  justify-between w-full px-3 py-3">
            <NewInvestment fetchData={fetchData} />
            <AllInvestment />
          </div>
        </>
      )}
    </div>
  );
}

export default InvestmentCard;
