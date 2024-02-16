import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import { inWordCurrency } from "../../util";
import { toast } from "react-toastify";

const NewExpense = ({ fetchCallBack }) => {
  const initialState = {
    category: "WANT",
    description: "",
    amount: "",
  };
  const store = useSelector((store) => store.auth);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (token != null && token !== undefined) {
      formData.userId = userId;
      const allData = await AuthAxiosInstance(token).post(`/expense`, formData);
      if (allData.status === 200) {
        toast.success("You Added An Expense", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchCallBack();
      }
    }
  };

  const checkHandler = () => {
    if (formData.description === "" || formData.amount === "") {
      return false;
    } else return true;
  };

  useEffect(() => {}, []);

  return (
    <Dialog.Root onOpenChange={() => setFormData(initialState)}>
      <Dialog.Trigger>
        <div className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1">
          <Button radius="large" variant="soft">
            Add New
          </Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>Enter New Expense</Dialog.Title>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="category"
                    value={0}
                    checked={formData.category === 0}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Need</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={1}
                    checked={formData.category === 1}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Want</span>
                </label>
              </div>
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
            {checkHandler() == true ? (
              <Dialog.Close>
                <Button>Save</Button>
              </Dialog.Close>
            ) : null}
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewExpense;
