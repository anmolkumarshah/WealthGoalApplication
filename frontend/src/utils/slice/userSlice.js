const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    personalData: {
      name: "",
      dob: "",
      address: "",
      phone: "",
    },
    loginData: {
      email: "",
      password: "",
      userType: 1,
    },
    incomeData: {
      incomeSource: "",
      monthlySalary: "",
      employmentType: "",
    },
  },
  reducers: {
    updatePersonal: (state, action) => {
      const { name, value } = action.payload;
      state.personalData[name] = value;
    },
    updateLogin: (state, action) => {
      const { name, value } = action.payload;
      state.loginData[name] = value;
    },
    updateIncome: (state, action) => {
      const { name, value } = action.payload;
      state.incomeData[name] = value;
    },
  },
});

export default userSlice.reducer;
export const { updatePersonal, updateLogin, updateIncome } = userSlice.actions;
