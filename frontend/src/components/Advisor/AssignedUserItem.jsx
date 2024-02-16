import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import Badge from "../common/Badge";
import useNonAuthRedirect from "../../utils/hooks/useNonAuthRedirect";

function AssignedUserItem({ data }) {
  useNonAuthRedirect();
  return (
    <div
      key={data?.id}
      className="flex flex-wrap px-3 py-3 rounded-md border-2 bg-neutral-50 items-center justify-between mb-1"
    >
      <Badge>{data?.userType}</Badge>
      <div className="">{data?.personalDetail?.name}</div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <div className="px-2 py-1 rounded-md bg-blue-100 font-normal cursor-pointer border-2">
            <Button>More Info</Button>
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <Flex gap="3" mt="4" justify="end">
            <div className="flex flex-col w-full items-center">
              <div className="w-full my-1 mx-auto bg-gray-50 text-black rounded-md overflow-hidden border-2  ">
                <div className="p-4 font-light">
                  <p>Date of Birth: {data?.personalDetail?.dob}</p>
                  <p>Address: {data?.personalDetail?.address}</p>
                  <p>Phone: {data?.personalDetail?.phone}</p>
                </div>
              </div>
              <div className="w-full mx-auto my-1 font-light bg-gray-50 text-black rounded-md overflow-hidden border-2  ">
                <div className="p-4">
                  <p>Income Source: {data?.incomeDetail?.incomeSource}</p>
                  <p>Monthly Salary: {data?.incomeDetail?.monthlySalary}</p>
                  <p>Emp. Type: {data?.incomeDetail?.employmentType}</p>
                </div>
              </div>
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
            </div>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

export default AssignedUserItem;
