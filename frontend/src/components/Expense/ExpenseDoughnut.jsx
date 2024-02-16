import { Chart } from "chart.js/auto";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { LoadingSpinner } from "../common/LoadingSpinner";

function ExpenseDoughnut() {
  const store = useSelector((store) => store.auth);
  const userId = store?.user?.id;
  const { data, error, loading } = useNetwordCall(
    "get",
    `customer/expense-pie/${userId}`
  );

  useEffect(() => {
    var myChart = new Chart();

    return () => {
      myChart.destroy();
    };
  }, []);

  if (data == null) {
    return <LoadingSpinner />;
  }

  const expData = {
    labels: data[0],
    datasets: [
      {
        data: data[1],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex justify-center w-100">
      <Doughnut data={expData} />
    </div>
  );
}

export default ExpenseDoughnut;
