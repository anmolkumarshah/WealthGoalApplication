import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import ExpenseItem from "./ExpenseItem";
import { toast } from "react-toastify";
import ExpenseDoughnut from "./ExpenseDoughnut";

function AllExpense({ fetchCallBack }) {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null); // Added state for filtered data
  const [selectedCategory, setSelectedCategory] = useState(""); // Added state for selected category
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;

    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/expense/${userId}?type`
      );
      if (allData.status === 200) {
        setData(allData.data);
        setFilteredData(allData.data); // Initialize filteredData with all data initially
      }
    }
  };

  const removeExpense = async (expIdToRemove) => {
    const updatedData = data.filter((item) => item?.expId !== expIdToRemove);
    const token = store?.token?.jwtToken;
    const allData = await AuthAxiosInstance(token).delete(
      `/expense/${expIdToRemove}`
    );

    if (allData.status === 200) {
      setData(updatedData);
      fetchCallBack();
      toast.warning("You Deleted An Expense", {
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
  };

  // Function to filter data based on selected category
  const filterData = () => {
    if (selectedCategory === "") {
      setFilteredData(data); // If no category is selected, show all data
    } else {
      const filtered = data.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData(); // Update filtered data whenever selected category changes
  }, [selectedCategory, data]);

  return (
    <Dialog.Root onOpenChange={() => fetchData()}>
      <Dialog.Trigger>
        <div className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1">
          <Button radius="large" variant="soft">
            View All
          </Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Content
        style={{ maxWidth: 750, maxHeight: 500, overflow: "none" }}
      >
        <Dialog.Title>All Expenses</Dialog.Title>

        <div className="flex items-center justify-between mb-4">
          <label htmlFor="categorySelect" className="mr-2">
            Select Category:
          </label>
          <select
            id="categorySelect"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {/* Add your unique categories based on your data */}
            <option value="WANT">WANT</option>
            <option value="NEED">NEED</option>
          </select>
        </div>

        {filteredData == null ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col-reverse md:flex-row items-start justify-between">
            <div>
              {filteredData.map((item) => (
                <ExpenseItem
                  key={item?.expId}
                  data={item}
                  removeExpense={removeExpense}
                />
              ))}
            </div>
            <div>
              <ExpenseDoughnut />
            </div>
          </div>
        )}

        <Dialog.Description></Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AllExpense;
