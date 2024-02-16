import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { truncateDescription } from "../../util";
import Badge from "../common/Badge";
import AllPlan from "../Plan/AllPlan";
import DisplayText from "../common/DisplayText";

function AllGoalUpdates() {
  const [data, setdata] = useState(null);
  const [selected, setSelected] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `customer/goal/with-plan/${userId}`
      );
      if (allData.status === 200) {
        setdata(allData.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data == null) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-100 flex flex-col md:flex-row mb-4  justify-between px-2">
      <div className="flex flex-col p-2 w-full md:w-1/2 md:sticky md:h-screen top-0">
        {data.map((el) => {
          return (
            <div
              key={el.goalId}
              onClick={() => setSelected(el)}
              className="cursor-pointer border p-4 rounded-md shadow-md  items-center justify-between mb-4 m-2"
            >
              <div className="flex justify-between">
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold mb-2">{el.goalTitle}</h2>
                  <p className="text-gray-600">
                    {truncateDescription(el.goalDescription, 30)}
                  </p>
                </div>
                <div className="flex flex-col items-end w-2/3">
                  <div className="mb-2">
                    <span className="text-gray-600">
                      Priority: <Badge>{el.goalPriority}</Badge>
                    </span>
                    <span className="text-gray-600">
                      Status: <Badge>{el.goalStatus}</Badge>
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600">Amount:</span> ₹{" "}
                    {el.goalAmount}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selected != null ? (
        <div className="w-100 md:w-1/2 shadow-md rounded-md m-2 px-2 py-3 h-full">
          <AllPlan
            gid={selected.goalId}
            forUser={true}
            goalStatus={selected?.goalStatus}
            allData={selected}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <DisplayText>Select A Goal First</DisplayText>
        </div>
      )}
    </div>
  );
}

export default AllGoalUpdates;
