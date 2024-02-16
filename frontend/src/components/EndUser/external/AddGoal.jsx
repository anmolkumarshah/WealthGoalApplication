import React, { useEffect, useState } from "react";
import { useNetwordCall } from "../../../utils/hooks/useNetwordCall";
import { useSelector } from "react-redux";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { inWordCurrency } from "../../../util";
import { AuthAxiosInstance } from "../../../utils/customAxiosInstance";
import { toast } from "react-toastify";

function AddGoal({ item }) {
  const store = useSelector((store) => store.auth);
  const userId = store?.user?.id;
  const subordinate = useNetwordCall(
    "get",
    `/customer/subordinate/${userId}?type`
  );

  const [subordinateOptions, setSubordinateOptions] = useState([]);
  const [formData, setFormData] = useState({
    goalTitle: "",
    goalDescription: "",
    goalPriority: "MEDIUM",
    goalAmount: 0,
    goalStartDate: new Date(),
    goalEndDate: new Date(),
    subordinateId: 0,
    riskFactor: 2,
    salaryPercentage: 0,
  });

  const checkHandler = () => {
    if (
      formData.goalTitle === "" ||
      formData.goalDescription === "" ||
      formData.goalPriority === "" ||
      formData.goalAmount === "" ||
      formData.goalAmount === "0" ||
      formData.goalStartDate === "" ||
      formData.goalEndDate === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const updatedValue =
      type === "radio" || type === "select-one"
        ? value
        : type === "checkbox"
        ? e.target.checked
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleStartDateChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      goalStartDate: e.target.value,
    }));
  };

  const handleEndDateChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      goalEndDate: e.target.value,
    }));
  };

  const handleSubordinateChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      subordinateId: parseInt(e.target.value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.goalDescription = item.description;
    formData.goalTitle = item.title;
    formData.userId = userId;

    const token = store?.token?.jwtToken;
    if (token != null && token !== undefined) {
      formData.goalCreatedBy = userId;
      const allData = await AuthAxiosInstance(token).post(
        `/goal/external/goal-selection`,
        formData
      );
      console.log(allData.data);
      if (allData.status === 200) {
        toast.success("You Added A Goal", {
          position: "top-right",
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

    console.log(formData);
  };

  useEffect(() => {
    if (subordinate.data != null) {
      setSubordinateOptions(subordinate.data);
    }
  }, [subordinate]);
  return (
    <AlertDialog.Root>
      <div className="px-2 py-1 rounded-md bg-slate-100 cursor-pointer border-2 text-center font-bold">
        <AlertDialog.Trigger>
          <Button>Add Goal</Button>
        </AlertDialog.Trigger>
      </div>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Add This Goal</AlertDialog.Title>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Goal Priority
            </label>
            <div className="flex">
              <label className="mr-4">
                <input
                  type="radio"
                  name="goalPriority"
                  value="HIGH"
                  checked={formData.goalPriority === "HIGH"}
                  onChange={handleChange}
                />
                <span className="ml-2">High</span>
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  name="goalPriority"
                  value="MEDIUM"
                  checked={formData.goalPriority === "MEDIUM"}
                  onChange={handleChange}
                />
                <span className="ml-2">Medium</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="goalPriority"
                  value="LOW"
                  checked={formData.goalPriority === "LOW"}
                  onChange={handleChange}
                />
                <span className="ml-2">Low</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Risk Factor
            </label>
            <input
              type="range"
              id="riskFactor"
              name="riskFactor"
              min="1"
              max="5"
              value={formData.riskFactor}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-600 mt-1">
              Risk Factor: {formData.riskFactor}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="goalTitle"
              name="goalTitle"
              defaultValue={item.title}
              disabled
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              minLength={5}
              type="text"
              disabled
              id="goalDescription"
              name="goalDescription"
              defaultValue={item.description}
              className="mt-1 p-2 w-full border rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Goal Start Date
            </label>
            <input
              type="date"
              id="goalStartDate"
              name="goalStartDate"
              value={formData.goalStartDate}
              onChange={handleStartDateChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Goal End Date
            </label>
            <input
              type="date"
              id="goalEndDate"
              name="goalEndDate"
              value={formData.goalEndDate}
              onChange={handleEndDateChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Goal Amount
            </label>
            <input
              type="number"
              id="goalAmount"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="font-mono text-sm">
            {inWordCurrency(formData.goalAmount)}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Salary Percentage
            </label>
            <input
              type="number"
              id="salaryPercentage"
              name="salaryPercentage"
              value={formData.salaryPercentage}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Subordinate
            </label>
            <select
              id="subordinateId"
              name="subordinateId"
              value={setSubordinateOptions[0]?.id}
              onChange={handleSubordinateChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option>Select</option>
              {subordinateOptions.map((subordinate) => (
                <option key={subordinate.id} value={subordinate.id}>
                  {subordinate.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <div onClick={handleSubmit}>
            <AlertDialog.Action>
              <Button variant="solid" color="red">
                Add Goal
              </Button>
            </AlertDialog.Action>
          </div>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default AddGoal;
