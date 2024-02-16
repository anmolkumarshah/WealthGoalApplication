import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
