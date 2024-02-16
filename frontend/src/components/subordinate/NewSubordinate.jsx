import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function NewSubordinate({ fetchData }) {
  const store = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    relation: "DAUGHTER",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "date"
          ? value
          : type === "select-one"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = store?.token?.jwtToken;
    const userId = store?.user?.id;
    if (token != null && token !== undefined) {
      formData.userId = userId;
      const allData = await AuthAxiosInstance(token).post(
        `/subordinate`,
        formData
      );
      if (allData.status === 200) {
        toast.success("You Added A New Subordinate", {
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
    if (formData.name === "" || new Date(formData.dob) >= new Date()) {
      return false;
    } else return true;
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
        <Dialog.Title>Add New Subordinate</Dialog.Title>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-600"
              >
                Birthdate
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="relation"
                className="block text-sm font-medium text-gray-600"
              >
                Relation
              </label>
              <select
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value={0}>Self</option>
                <option value={1}>Son</option>
                <option value={2}>Daughter</option>
                <option value={3}>Wife</option>
                <option value={4}>Husband</option>
                <option value={5}>Mother</option>
                <option value={6}>Father</option>
                <option value={7}>Inlaws</option>
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

export default NewSubordinate;
