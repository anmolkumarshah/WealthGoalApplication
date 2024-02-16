import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";

function ReusableDialogBox({ name, element }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="rounded-md bg-yellow-100 cursor-pointer border-2 px-2 py-1">
          <Button radius="large" variant="soft">
            {name}
          </Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Enter New Expense</Dialog.Title>
        {element}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ReusableDialogBox;
