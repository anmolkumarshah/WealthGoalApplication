import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { inWordCurrency } from "../../util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function NewGoal({ fetchData }) {
  useNonAuthRedirect();
  const store = useSelector((store) => store.auth);
  const [subordinateOptions, setSubordinateOptions] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goalTitle: "",
    goalDescription: "",
    goalPriority: "MEDIUM",
    goalAmount: 0,
    goalStartDate: new Date(),
    goalEndDate: new Date(),
    subordinateId: 0,
    riskFactor: 2,
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
    console.log("e.target.value");
    setFormData((prevData) => ({
      ...prevData,
      subordinateId: parseInt(e.target.value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (token != null && token !== undefined) {
      formData.goalCreatedBy = userId;
      const allData = await AuthAxiosInstance(token).post(`/goal`, formData);
      if (allData.status === 200) {
        fetchData();
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

  const fetchSubordinate = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/subordinate/${userId}?type`
      );
      if (allData.status === 200) {
        setSubordinateOptions(allData.data);
      }
    }
  };

  useEffect(() => {
    fetchSubordinate();
  }, []);

  return (
    <Dialog.Root>
      {store.user.userType != "EXTERNAL" ? (
        <Dialog.Trigger>
          <div className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1">
            <Button size={1} radius="large" variant="soft">
              Add New
            </Button>
          </div>
        </Dialog.Trigger>
      ) : (
        <div
          onClick={() => navigate("/user/goal-list")}
          className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1"
        >
          <Button size={1} radius="large" variant="soft">
            Add New
          </Button>
        </div>
      )}

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>Add New Goal</Dialog.Title>
        <div className="max-w-md mx-auto mt-8  bg-white">
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
                value={formData.goalTitle}
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
              <input
                type="text"
                id="goalDescription"
                name="goalDescription"
                value={formData.goalDescription}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
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
        </div>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>

          <div onClick={handleSubmit}>
            {checkHandler() === true ? (
              <Dialog.Close>
                <Button>Save</Button>
              </Dialog.Close>
            ) : null}
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewGoal;
