import React from "react";
import Installmenttem from "./Installmenttem";
import { calculateDaysBetweenDates } from "../../util";
import PayInstallmentItem from "./PayInstallmentItem";

function AllInstallment({ data, forJourney, callback }) {
  function formateDate(date) {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-IN", options);
    return formattedDate;
  }
  return (
    <div className="flex flex-col items-start flex-wrap w-80">
      {data.length > 0 ? (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mx-1 "
            htmlFor="totalAmount"
          >
            Expected To Complete In :{" "}
            {calculateDaysBetweenDates(
              data[0].payDate,
              data[data.length - 1].payDate
            )}{" "}
            days
          </label>
        </div>
      ) : null}
      {forJourney == true ? (
        <div className="flex flex-no-wrap overflow-x-auto">
          {data.map((el) => (
            <PayInstallmentItem
              key={el.idx}
              amount={el.amount}
              date={formateDate(new Date(el.payDate))}
              idx={el.idx}
              insId={el.id}
              paid={el.paid}
              callback={callback}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-no-wrap overflow-x-auto">
          {data.map((el) => (
            <Installmenttem
              key={el.idx}
              amount={el.amount}
              date={formateDate(new Date(el.payDate))}
              idx={el.idx}
              paid={el.paid}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllInstallment;
