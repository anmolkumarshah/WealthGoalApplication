import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import ListInfo from "../EndUser/ListInfo";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import NewGoal from "./NewGoal";
import AllGoal from "./AllGoal";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";
import { useNavigate } from "react-router-dom";

function GoalCard() {
  useNonAuthRedirect();
  const [allData, setAllData] = useState(null);
  const store = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/goal/${userId}?status=`
      );
      if (allData.status === 200) {
        setAllData(allData.data);
      }
    }
  };

  useEffect(() => {
    if (store.user == null) {
      navigate("/login");
    }
    fetchData();
  }, []);
  return (
    <div className="cursor-pointer p-1  border-orange-950 border-4 rounded-xl  bg-rose-900 w-100 md:w-1/4 my-3 mx-1 flex flex-col justify-between items-center">
      {allData == null ? (
        <LoadingSpinner />
      ) : (
        <>
          <div
            // onClick={() => navigate("/user/goal-journey")}
            className="w-full p-2"
          >
            <ListInfo name="Total Goals" number={allData?.length} />
            {store.user.userType != "EXTERNAL" ? (
              <>
                <ListInfo
                  name="Pending Goals"
                  number={
                    allData.filter((el) => el?.goalStatus === "PENDING").length
                  }
                />
                <ListInfo
                  name="Approved Goals"
                  number={
                    allData.filter((el) => el?.goalStatus === "APPROVED").length
                  }
                />
                <ListInfo
                  name="Rejected Goals"
                  number={
                    allData.filter((el) => el?.goalStatus === "REJECTED").length
                  }
                />
              </>
            ) : null}
          </div>
          <div className=" flex md:flex-col xl:flex-row justify-between w-full px-3 py-3">
            <NewGoal fetchData={fetchData} />
            <AllGoal fetchData={fetchData} />
          </div>
        </>
      )}
    </div>
  );
}

export default GoalCard;
