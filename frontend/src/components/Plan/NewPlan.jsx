import React, { useEffect, useState } from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { calculateDaysBetweenDates, inWordNumber } from "../../util";
import AllInstallment from "./AllInstallment";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function NewPlan({ salary, totalAmt, startdate, endDate, gId, fetchData }) {
  useNonAuthRedirect();
  const store = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    percentage: 0.0,
    totalAmount: totalAmt,
  });

  const [insData, setInsData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "percentage") {
      if (value > 0) {
        const per = parseFloat(value);
        const maxPer = (parseFloat(totalAmt) / parseFloat(salary)) * 100;
        if (per <= maxPer) {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        } else if (per > maxPer) {
          alert("Cannot be more than " + maxPer + " %");
          setFormData((prevData) => ({
            ...prevData,
            [name]: 0,
          }));
        }
      } else {
        setInsData([]);
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  useEffect(() => {
    if (
      salary !== undefined &&
      totalAmt !== undefined &&
      formData.percentage != "" &&
      formData.percentage != 0
    ) {
      const totalSalary = parseFloat(salary);
      const totalAmount = parseFloat(totalAmt);
      const salPercentage = parseFloat(formData.percentage);
      const insValue = Math.floor((salPercentage / 100) * totalSalary);
      const fullInstallments = Math.floor(totalAmount / insValue);
      const leftAmt = Math.floor(totalAmount - fullInstallments * insValue);
      const insList = [];

      for (let i = 0; i < fullInstallments; i++) {
        // {amount,payDate}
        let temp = new Date(startdate);
        let newDate = temp.setMonth(temp.getMonth() + i);
        let obj = { amount: insValue, payDate: new Date(newDate), idx: i + 1 };
        insList.push(obj);
      }
      if (leftAmt > 0) {
        let temp = new Date(insList[insList.length - 1].payDate);
        insList.push({
          amount: leftAmt,
          payDate: new Date(temp.setMonth(temp.getMonth() + 1)),
          idx: insList[insList.length - 1].idx + 1,
        });
      }
      setInsData(insList);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    const token = store?.token?.jwtToken;
    e.preventDefault();
    if (insData.length > 0) {
      const obj = {
        percentage: formData.percentage,
        totalAmount: totalAmt,
        startDate: new Date(insData[0].payDate).toISOString().split("T")[0],
        endDate: new Date(insData[insData.length - 1].payDate)
          .toISOString()
          .split("T")[0],
        goalId: gId,
      };

      if (token != null && token !== undefined) {
        const allData = await AuthAxiosInstance(token).post(`/plan`, obj);
        if (allData.status === 200) {
          const pId = allData.data.id;

          let i = 1;
          for (let inst of insData) {
            const tempObj = {
              amount: inst.amount,
              payDate: new Date(inst.payDate).toISOString(),
              planId: pId,
              paid: false,
              idx: i,
            };
            i++;

            const allData2 = await AuthAxiosInstance(token).post(
              `/installment`,
              tempObj
            );
            if (allData2.status === 200) {
              // alert("Saved");
            }
          }
          fetchData();
        }
        toast.success("New Plan For Goal Has Been Added", {
          position: "bottom-right",
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

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="px-2 py-1 rounded-md bg-yellow-100 cursor-pointer border-2 text-center mx-2 font-semibold">
          <Button>Add New Plan</Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 750 }}>
        <form className=" mx-auto mt-4 p-6 bg-white">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="percentage"
            >
              Salary Percentage:
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              value={formData.percentage}
              onChange={handleInputChange}
              max={(parseFloat(totalAmt) / parseFloat(salary)) * 100}
              className="w-full p-2 border rounded-md"
            />
            <div className="font-mono text-sm">
              {inWordNumber(formData.percentage)}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="totalAmount"
            >
              Total Salary: ₹ {salary}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="totalAmount"
            >
              Total Goal Amount: ₹ {totalAmt}
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="totalAmount"
            >
              User Wants To Complete In :{" "}
              {calculateDaysBetweenDates(startdate, endDate)} days
            </label>
          </div>

          <AllInstallment data={insData} />
        </form>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <div onClick={handleSubmit}>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewPlan;
