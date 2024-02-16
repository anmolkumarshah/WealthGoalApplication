import React, { useEffect, useState } from "react";
import InvestmentItem from "./InvestmentItem";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import InvestmentDoughnut from "./InvestmentDoughnut";

function AllInvestment() {
  const [data, setdata] = useState(null);
  const store = useSelector((store) => store.auth);

  const fetchData = async () => {
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (userId != null && userId !== undefined) {
      const allData = await AuthAxiosInstance(token).get(
        `/customer/investment/${userId}`
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

      <Dialog.Content style={{ maxWidth: 750 }}>
        <Dialog.Title>All Investments</Dialog.Title>

        {data == null ? (
          <LoadingSpinner />
        ) : (
          <div className="flex items-center justify-between">
            <div>
              {data.map((item) => (
                <InvestmentItem key={item?.instId} data={item} />
              ))}
            </div>
            {data.length > 0 && (
              <div>
                <InvestmentDoughnut />
              </div>
            )}
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

export default AllInvestment;
