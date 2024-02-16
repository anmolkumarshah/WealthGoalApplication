import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { LoadingSpinner } from "../common/LoadingSpinner";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function GoalCompletionLineGraph({ goalId }) {
  useNonAuthRedirect();
  const { data, error, loading } = useNetwordCall(
    "get",
    `goal/progress/${goalId}`
  );

  if (loading == true || data == null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col  md:flex-row items-center justify-center">
      <div className="w-2/3">
        <Line
          width={100}
          height={30}
          data={{
            labels: data[0].map((el) => el.x),
            datasets: [
              {
                label: "Expected Path",
                data: data[0],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.5,
              },
              {
                label: `Your Journey`,
                data: data[1],
                fill: true,
                borderColor: "rgb(192, 75, 75)", // Different color for the second dataset
                tension: 0.5,
              },
            ],
          }}
        />
      </div>
      <div className="w-1/3" style={{ width: "15%" }}>
        <Pie
          height={10}
          width={5}
          data={{
            labels: ["Completed", "Not Completed"],
            datasets: [
              {
                label: "My First Dataset",
                data: [data[2], 100 - data[2]],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
                hoverOffset: 4,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default GoalCompletionLineGraph;
