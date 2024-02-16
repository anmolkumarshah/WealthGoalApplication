import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AuthAxiosInstance } from "../../utils/customAxiosInstance";
import { toast } from "react-toastify";
import { inWordCurrency } from "../../util";
import { addUser } from "../../utils/slice/authSlice";

function EditJobInfo({ incomeSource, monthlySalary, employmentType }) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const employmentTypes = [
    "PERMANENT",
    "CONTRACTUAL",
    "PART_TIME",
    "INTERNSHIP",
    "CONSULTANT",
    "PROBATIONARY",
    "APPRENTICESHIP",
    "FIXED_TERM",
  ];

  const [formData, setFormData] = useState({
    incomeSource: "",
    monthlySalary: "",
    employmentType: "",
  });

  useEffect(() => {
    setFormData({
      incomeSource: incomeSource,
      monthlySalary: monthlySalary,
      employmentType: employmentTypes.indexOf(employmentType),
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue =
      name === "employmentType" ? parseInt(value, 10) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(updatedValue) : updatedValue,
    }));
  };

  const validateFields = (dataObject) => {
    for (const key in dataObject) {
      if (dataObject.hasOwnProperty(key)) {
        if (typeof dataObject[key] === "object") {
          // If the property is an object, recursively validate its fields
          if (!validateFields(dataObject[key])) {
            return false; // Validation failed in nested object
          }
        } else if (
          dataObject[key] === null ||
          dataObject[key].length === undefined ||
          dataObject[key].length === 0
        ) {
          return false; // Field validation failed
        }
      }
    }
    // All fields in the object have length greater than 0, validation passed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.endUserId = auth.user.id;
    console.log(formData);
    const response = await AuthAxiosInstance(auth.token.jwtToken).post(
      "/customer/update/income-info",
      formData
    );
    if (response.status === 200) {
      dispatch(addUser(response.data));
      toast.success(`Income Information Changed Successfully`, {
        position: "bottom-right",
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

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="absolute top-0 right-0 m-2 bg-blue-500 text-white px-2 py-1 rounded">
          <MdEdit />
        </button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit profile</Dialog.Title>

        <div className="max-w-md mx-auto mt-8 p-6 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="incomeSource"
                className="block text-sm font-medium text-gray-600"
              >
                Income Source
              </label>
              <input
                type="text"
                id="incomeSource"
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="monthlySalary"
                className="block text-sm font-medium text-gray-600"
              >
                Monthly Salary
              </label>
              <input
                type="number"
                id="monthlySalary"
                name="monthlySalary"
                value={formData.monthlySalary}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {inWordCurrency(formData.monthlySalary)}
            </div>

            <div className="mb-4">
              <label
                htmlFor="employmentType"
                className="block text-sm font-medium text-gray-600"
              >
                Employment Type
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                {/* Map through your specific employment types and create options */}
                <option index={-1} value={""}>
                  Select Job Type
                </option>
                {employmentTypes.map((type, index) => (
                  <option key={index} value={index}>
                    {type}
                  </option>
                ))}
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
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditJobInfo;
