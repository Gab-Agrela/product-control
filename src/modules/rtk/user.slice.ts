import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.token = payload.token;
    },
    resetUser: (state) => {
      state.token = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
