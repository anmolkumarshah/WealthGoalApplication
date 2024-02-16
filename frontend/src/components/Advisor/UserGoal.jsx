import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import SubordinateItem from "../subordinate/SubordinateItem";
import Badge from "../common/Badge";
import AllPlan from "../Plan/AllPlan";
import { inWordCurrency } from "../../util";
import { toast } from "react-toastify";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function UserGoal() {
  useNonAuthRedirect();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;

    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(`goal/${id}`);

      if (allData.status === 200) {
        setData(allData.data);
      }
    }
  };

  const handleChangeStatus = async (id, status) => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;

    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `goal/status/${id}?status=${status}`
      );

      if (allData.status === 200) {
        // alert("Updated");
        fetchData();
        toast.warn("Goal  Status Updated :" + status, {
          position: "top-center",
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row ">
      {/* left */}
      <div className="flex flex-col p-2 w-full md:w-1/3 md:sticky md:h-screen top-0">
        <div className="border p-4 rounded-md shadow-md  items-center justify-between mb-4 m-2">
          <div className="flex w-100 justify-between">
            <h2 className="text-xl font-semibold mb-2">{data.goalTitle}</h2>
            <p className="text-gray-600">{data?.goalDescription}</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600">
                Priority: <Badge>{data.goalPriority}</Badge>
              </span>
              <span className="text-gray-600">
                Status: <Badge>{data.goalStatus}</Badge>
              </span>
            </div>

            <div>
              <span className="text-gray-600">Amount:</span> ₹ {data.goalAmount}
            </div>
            <div>{inWordCurrency(data.goalAmount)}</div>
          </div>
        </div>

        <div className="my-1 m-2 font-mono px-2">
          <div className="p-4">
            <p>Goal By : {data?.user?.personalDetail?.name}</p>
            <p>Income Source: {data?.user?.incomeDetail?.incomeSource}</p>
            <p>
              Monthly Salary:{" "}
              {inWordCurrency(data?.user?.incomeDetail?.monthlySalary)}
            </p>
            <p>Emp. Type: {data?.user?.incomeDetail?.employmentType}</p>
          </div>
          <div className="w-full px-2">
            <SubordinateItem data={data?.subordinate} />
          </div>
        </div>

        {data.goalStatus === "PENDING" ? (
          <div className="flex flex-row w-full px-5">
            <div
              onClick={() => handleChangeStatus(data.goalId, "approved")}
              className="bg-yellow-100 rounded-md border-2 px-2 cursor-pointer m-1 w-1/2 text-center"
            >
              Approve
            </div>
            <div
              onClick={() => handleChangeStatus(data.goalId, "rejected")}
              className="bg-red-100 rounded-md border-2 px-2 cursor-pointer m-1 w-1/2 text-center"
            >
              Reject
            </div>
          </div>
        ) : null}
      </div>

      {/* right */}
      <div className="flex  flex-col p-5 w-full  md:w-2/3 mt-2">
        <AllPlan
          callBack={fetchData}
          allData={data}
          gid={id}
          goalStatus={data.goalStatus}
        />
      </div>
    </div>
  );
}

export default UserGoal;
