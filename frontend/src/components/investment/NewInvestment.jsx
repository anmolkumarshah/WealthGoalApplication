import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { inWordCurrency } from "../../util";
import { toast } from "react-toastify";

function NewInvestment({ fetchData }) {
  const store = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    priority: "",
    category: "",
    description: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // If the field is a radio button or select, convert the value to a number if needed
    // const updatedValue =
    //   type === "radio" || type === "select-one" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (token != null && token !== undefined) {
      formData.userId = userId;
      const allData = await AuthAxiosInstance(token).post(
        `/investment`,
        formData
      );
      if (allData.status === 200) {
        toast.success("You Added An Investment", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchData();
      }
    }
  };

  const checkHandler = () => {
    if (
      formData.description === "" ||
      formData.amount == "" ||
      formData.amount == "0"
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1">
          <Button radius="large" variant="soft">
            Add New
          </Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>Add New Investment</Dialog.Title>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Priority
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="priority"
                    value="HIGH"
                    checked={formData.priority === "HIGH"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">High</span>
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="priority"
                    value="MEDIUM"
                    checked={formData.priority === "MEDIUM"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Medium</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="priority"
                    value="LOW"
                    checked={formData.priority === "LOW"}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Low</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="SAVINGS_ACCOUNT">Savings Account</option>
                <option value="FIXED_ACCOUNT">Fixed Account</option>
                <option value="RECURRING_DEPOSIT">Recurring Deposit</option>
                <option value="PPF">PPF</option>
                <option value="EPF">EPF</option>
                <option value="NSC">NSC</option>
                <option value="SCSS">SCSS</option>
                <option value="MUTUAL_FUNDS">Mutual Funds</option>
                <option value="GOLD_SAVING">Gold Saving</option>
                <option value="SSY">SSY</option>
                <option value="NPS">NPS</option>
              </select>
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
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-600"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="font-mono text-sm">
              {inWordCurrency(formData.amount)}
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

export default NewInvestment;
