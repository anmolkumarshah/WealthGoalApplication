import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";

function UpdatedPlanNotification() {
  const [data, setdata] = useState(null);
  const navigate = useNavigate();
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `customer/goal/with-plan/${userId}`
      );

      if (allData.status === 200) {
        console.log(allData.data);
        setdata(allData.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data == null) {
    return <LoadingSpinner />;
  } else if (data?.length > 0) {
    return (
      <div className="flex justify-center items-center bg-blue-50 rounded-md w-full p-4 border-black border-dashed border-2 text-center font-mono font-semibold">
        <div>{data.length} update</div>
        <IoNotificationsCircle />
        <div className="mx-3">
          <Button callBackFunction={() => navigate("/user/plan-notification")}>
            View All
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default UpdatedPlanNotification;
