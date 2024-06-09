import { createSlice } from "@reduxjs/toolkit";

const errorNotifSlice = createSlice({
  name: "errorNotif",
  initialState: "",
  reducers: {
    setErrorNotif(state, action) {
      const content = action.payload;
      return content;
    },
    removeErrorNotif(state, action) {
      return "";
    },
  },
});

export const { setErrorNotif, removeErrorNotif } = errorNotifSlice.actions;

export const setTimedErrorNotif = (message) => {
  return (dispatch) => {
    dispatch(setErrorNotif(message));
    setTimeout(() => {
      dispatch(removeErrorNotif());
    }, 5000);
  };
};

export default errorNotifSlice.reducer;
