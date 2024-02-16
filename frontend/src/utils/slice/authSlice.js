const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.clear();
    },
    addToken: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;

      const data = action.payload;
      localStorage.setItem("token", data.jwtToken);
    },
    removeToken: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;
export const { addUser, removeUser, addToken } = authSlice.actions;
