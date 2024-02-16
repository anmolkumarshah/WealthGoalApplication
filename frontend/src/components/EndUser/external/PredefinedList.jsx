import { useEffect } from "react";
import { useNetwordCall } from "../../../utils/hooks/useNetwordCall";
import Button from "../../common/Button";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import AddGoal from "./AddGoal";
import { toast } from "react-toastify";

function PredefinedList() {
  const { data, error, loading } = useNetwordCall(
    "get",
    `customer/external/predefined-list`
  );

  useEffect(() => {
    toast.info("Select From This List", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  if (data == null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-wrap justify-center w-full">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer flex flex-col justify-between  max-w-xs mx-2 my-4 bg-white shadow-md hover:shadow-lg rounded-md overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <AddGoal item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default PredefinedList;
