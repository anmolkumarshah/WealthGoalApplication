import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLogin } from "../utils/slice/userSlice";

export default function LoginDetail() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: 1,
  });

  useEffect(() => {
    setFormData(store.loginData);
  }, [store]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? parseInt(value, 10) : value,
    }));
    dispatch(
      updateLogin({
        name: name,
        value: type === "radio" ? parseInt(value, 10) : value,
      })
    );
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete=""
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            User Type
          </label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="userType"
                value={1}
                checked={formData.userType === 1}
                onChange={handleChange}
              />
              <span className="ml-2">Internal User</span>
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value={0}
                checked={formData.userType === 0}
                onChange={handleChange}
              />
              <span className="ml-2">External User</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
