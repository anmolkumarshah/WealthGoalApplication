import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import AllInstallment from "./AllInstallment";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { inWordCurrency } from "../../util";
import { toast } from "react-toastify";

function PlanItem({
  amount,
  salPer,
  pid,
  start,
  end,
  selected,
  forUser,
  anySelected,
  refresh,
}) {
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined && pid !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `plan/${pid}/installment`
      );
      if (allData.status === 200) {
        setdata(allData.data);
      }
    }
  };

  const handleSelectPlan = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined && pid !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/plan/action/${pid}?selected=true`
      );
      if (allData.status === 200) {
        toast.success("You Selected A Plan", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchData();
        refresh();
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
    <div
      className={`border-2 ${
        selected ? "bg-orange-100" : "bg-slate-100"
      }  rounded-md mx-2 p-2 w-100 mb-2`}
    >
      <div className="flex justify-between font-thin text-md">
        <div>Goal Amount : ₹ {amount}</div>
        <div>Salary Perc. : {salPer}%</div>
      </div>
      <div className="font-mono text-sm">{inWordCurrency(amount)}</div>
      <div className="flex justify-between mt-1">
        <div className="font-thin text-sm">
          {start} to {end}{" "}
        </div>

        {forUser ? (
          selected ? (
            <Badge>Selected</Badge>
          ) : anySelected ? (
            ""
          ) : (
            <Button callBackFunction={handleSelectPlan}>Select</Button>
          )
        ) : (
          <Badge>{selected ? "Selected" : "Not Selected"}</Badge>
        )}
      </div>

      <div className="border-2 my-2"></div>
      <div className="flex flex-no-wrap overflow-x-auto">
        {data.length > 0 ? (
          <AllInstallment data={data} callback={fetchData} />
        ) : null}
      </div>
    </div>
  );
}

export default PlanItem;
