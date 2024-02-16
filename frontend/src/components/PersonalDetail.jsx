import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonal } from "../utils/slice/userSlice";

function PersonalDetail() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    dispatch(updatePersonal({ name: name, value: value }));
  };

  useEffect(() => {
    setFormData(store.personalData);
  }, [store]);

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date.target.value,
    }));
    dispatch(updatePersonal({ name: "dob", value: date.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6">
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
            htmlFor="dob"
            className="block text-sm font-medium text-gray-600"
          >
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={handleDateChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
