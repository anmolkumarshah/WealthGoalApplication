import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { Chart } from "chart.js/auto";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Doughnut, PolarArea } from "react-chartjs-2";

function InvestmentDoughnut() {
  const store = useSelector((store) => store.auth);
  const userId = store?.user?.id;
  const { data, error, loading } = useNetwordCall(
    "get",
    `customer/investment-pie/${userId}`
  );

  console.log(data);

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

        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <PolarArea data={expData} />
    </div>
  );
}

export default InvestmentDoughnut;
