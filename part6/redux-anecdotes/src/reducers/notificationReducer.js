import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    clearNotification() {
      return "";
    },
    setNotif(state, action) {
      return action.payload;
    },
  },
});

export const { clearNotification, setNotif } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotif(message));
    setTimeout(() => dispatch(clearNotification()), time * 1000);
  };
};

export default notificationSlice.reducer;
