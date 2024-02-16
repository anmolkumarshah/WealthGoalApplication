import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIncome } from "../utils/slice/userSlice";
import { AuthAxiosInstance } from "../utils/customAxiosInstance";
import { addToken, addUser } from "../utils/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { inWordCurrency } from "../util";
import { toast } from "react-toastify";

function IncomeDetail() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.user);
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
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

  useEffect(() => {
    setFormData(store.incomeData);
  }, [store]);

  const [formData, setFormData] = useState({
    incomeSource: "",
    monthlySalary: "",
    employmentType: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue =
      name === "employmentType" ? employmentTypes[parseInt(value, 10)] : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(updatedValue) : updatedValue,
    }));
    dispatch(
      updateIncome({
        name: name,
        value: type === "number" ? parseFloat(value) : value,
      })
    );
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

    const datObj = {
      personalDetail: store.personalData,
      incomeDetail: store.incomeData,
      email: store.loginData.email,
      password: store.loginData.password,
      userType: store.loginData.userType,
    };

    // console.log(datObj);

    const response = await AuthAxiosInstance(auth.token).post(
      "/auth/signup",
      datObj
    );
    if (response.status === 200) {
      dispatch(addToken(response.data));
      if (response.data.authorities === "ROLE_ADVISOR") {
        // something else
      } else if (
        response.data.authorities === "ROLE_EXTERNAL" ||
        response.data.authorities === "ROLE_INTERNAL"
      ) {
        const data = await AuthAxiosInstance(response.data.jwtToken).get(
          "/customer/data?email=" + response.data.username
        );
        // console.log(data.data);
        if (data.status === 200) {
          dispatch(addUser(data.data));
          toast.success(`Welcome, ${data.data.personalDetail.name}`, {
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
      }
      navigate("/user/dashboard");
    }
  };

  return (
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default IncomeDetail;
