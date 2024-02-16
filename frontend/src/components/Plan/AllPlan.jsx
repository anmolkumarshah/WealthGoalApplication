import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import PlanItem from "./PlanItem";
import NewPlan from "./NewPlan";
import { toast } from "react-toastify";
import DisplayText from "../common/DisplayText";

function AllPlan({ gid, forUser, callBack, allData, goalStatus }) {
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(`/goal/plan/${gid}`);
      if (allData.status === 200) {
        setdata(allData.data);
        if (
          forUser == null &&
          allData?.data.some((el) => el?.selected === true) &&
          goalStatus == "PENDING"
        ) {
          toast.success("User Has Selected Some Plan", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const anySelected = () => {
    // console.log(data);
    if (data == null) return false;
    return data.filter((el) => el.selected == true).length > 0 ? true : false;
  };

  if (data == null) {
    return <LoadingSpinner />;
  }

  if (allData.goalStatus == "REJECTED") {
    return <DisplayText>Goal Rejected</DisplayText>;
  }

  return (
    <div>
      {(forUser === false || forUser == null) &&
      anySelected() == false &&
      allData?.goalStatus != "REJECTED" ? (
        <NewPlan
          totalAmt={allData?.goalAmount}
          salary={allData?.user?.incomeDetail?.monthlySalary}
          startdate={allData?.goalStartDate}
          endDate={allData?.goalEndDate}
          gId={gid}
          fetchData={fetchData}
        />
      ) : null}
      <div className="my-3"></div>
      <div className="">
        {data == null ? (
          <LoadingSpinner />
        ) : (
          <div>
            {data.map((item) => (
              <PlanItem
                key={item?.id}
                amount={item.totalAmount}
                salPer={item.percentage}
                start={item.startDate}
                end={item.endDate}
                pid={item?.id}
                selected={item?.selected}
                forUser={forUser}
                anySelected={anySelected()}
                refresh={fetchData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPlan;
