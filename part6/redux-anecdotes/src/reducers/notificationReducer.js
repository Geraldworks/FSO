import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    voteAnecNotif(state, action) {
      return `you voted '${action.payload}'`;
    },
    createAnecNotif(state, action) {
      return `you created '${action.payload}'`;
    },
    clearAnecNotif() {
      return "";
    },
  },
});

export const { voteAnecNotif, createAnecNotif, clearAnecNotif } =
  notificationSlice.actions;
export default notificationSlice.reducer;
