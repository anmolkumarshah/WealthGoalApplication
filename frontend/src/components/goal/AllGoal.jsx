import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { LoadingSpinner } from "../common/LoadingSpinner";
import GoalItem from "./GoalItem";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AllGoal() {
  useNonAuthRedirect();
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/goal/${userId}?status=`
      );
      if (allData.status === 200) {
        setdata(allData.data);
      }
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

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>All Goals</Dialog.Title>

        {data == null ? (
          <LoadingSpinner />
        ) : (
          <div>
            {data.map((item) => (
              <GoalItem key={item?.goalId} data={item} />
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

export default AllGoal;
