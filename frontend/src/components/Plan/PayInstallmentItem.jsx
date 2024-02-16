import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoMdDoneAll } from "react-icons/io";

function PayInstallmentItem({ amount, date, idx, insId, paid, callback }) {
  const store = useSelector((store) => store.auth);

  const handlePayInstallment = async () => {
    const token = store?.token?.jwtToken;
    const allData = await AuthAxiosInstance(token).get(
      `/installment/pay/${insId}`
    );
    if (allData.status === 200) {
      callback();
      toast.success("You Have Successfully Paid An Installment", {
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

  let payDate;
  try {
    // payDate = new Date(date);
    const dateParts = date.split("/");
    const formattedDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    );
    payDate = formattedDate;
  } catch (e) {
    const dateParts = date.split("/");
    const formattedDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    );
    payDate = formattedDate;
  }
  // console.log(payDate);
  return (
    <>
      <AlertDialog.Root>
        {payDate < new Date() ? (
          <AlertDialog.Trigger>
            <div className="cursor-pointer flex justify-between items-center bg-amber-200 border-2 border-black border-dashed rounded-md mx-1 my-1 p-2 font-mono text-xs min-w-[100px] w-100">
              {paid === true ? (
                <IoMdDoneAll />
              ) : (
                <div className="bg-black text-white rounded-full p-1 ">
                  {idx}
                </div>
              )}

              <div className="flex flex-col items-center">
                <div>₹ {amount}</div>
                <div className="text-xs">{date}</div>
              </div>
            </div>
          </AlertDialog.Trigger>
        ) : (
          <div className="cursor-wait flex justify-between items-center bg-gray-300 border-2 border-black border-dashed rounded-md mx-1 my-1 p-2 font-mono text-xs min-w-[100px] w-100">
            <div className="bg-black text-white rounded-full p-1 ">{idx}</div>
            <div className="flex flex-col items-center">
              <div>₹ {amount}</div>
              <div className="text-xs">{date}</div>
            </div>
          </div>
        )}
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>
            {paid === true ? "Paid Installment" : "Pay Installment"}
          </AlertDialog.Title>

          <div>
            <div>Installment No : {idx}</div>
            <div>Amount : ₹ {amount}</div>
          </div>

          <Flex gap="3" mt="1" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            {paid === true ? null : (
              <AlertDialog.Action>
                <div onClick={handlePayInstallment}>
                  <Button variant="solid" color="red">
                    Pay
                  </Button>
                </div>
              </AlertDialog.Action>
            )}
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default PayInstallmentItem;
