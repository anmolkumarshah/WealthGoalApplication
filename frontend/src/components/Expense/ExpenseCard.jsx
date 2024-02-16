import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import ListInfo from "../EndUser/ListInfo";
import NewExpense from "./NewExpense";
import AllExpense from "./AllExpense";
import ExpenseDoughnut from "./ExpenseDoughnut";

function ExpenseCard() {
  const [allData, setAllData] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;

    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/expense/${userId}?type`
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
    <div className="p-1 border-orange-950 border-4 rounded-xl  bg-indigo-900 flex   shadow-md md:w-1/4 my-3 mx-1 flex-col justify-between items-center">
      {allData == null ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full p-2">
            <ListInfo name="Total Expenses" number={allData?.length} />
            <ListInfo
              name="Needs"
              number={allData.filter((el) => el?.category === "NEED").length}
            />
            <ListInfo
              name="Wants"
              number={allData.filter((el) => el?.category === "WANT").length}
            />
          </div>
          <div className="flex md:flex-col xl:flex-row  justify-between w-full px-3 py-3">
            <NewExpense fetchCallBack={fetchData} />
            <AllExpense fetchCallBack={fetchData} />
          </div>
        </>
      )}
    </div>
  );
}

export default ExpenseCard;
