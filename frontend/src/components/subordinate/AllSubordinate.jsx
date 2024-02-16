import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import SubordinateItem from "./SubordinateItem";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AllSubordinate({ refresh }) {
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/subordinate/${userId}?type`
      );
      if (allData.status === 200) {
        setdata(allData.data);
      }
    }
  };

  const removeSubordinate = async (subordinateIdToRemove) => {
    const updatedData = data.filter(
      (item) => item?.id !== subordinateIdToRemove
    );
    const token = store?.token?.jwtToken;
    const allData = await AuthAxiosInstance(token).delete(
      `/subordinate/${subordinateIdToRemove}`
    );
    if (allData.status === 200) {
      refresh();
      toast.warning("You Deleted A Subordinate", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setdata(updatedData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Dialog.Root onOpenChange={() => fetchData()}>
      <Dialog.Trigger>
        <div className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1">
          <Button radius="large" variant="soft">
            View All
          </Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>All Subordinates</Dialog.Title>

        {data == null ? (
          <LoadingSpinner />
        ) : (
          <div>
            {data.map((item) => (
              <SubordinateItem
                key={item?.id}
                data={item}
                remove={removeSubordinate}
              />
            ))}
          </div>
        )}

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

export default AllSubordinate;
