import { createSlice } from "@reduxjs/toolkit";

const successNotifSlice = createSlice({
  name: "successNotif",
  initialState: "",
  reducers: {
    setSuccessNotif(state, action) {
      const content = action.payload;
      return content;
    },
    removeSuccessNotif(state, action) {
      return "";
    },
  },
});

export const { setSuccessNotif, removeSuccessNotif } =
  successNotifSlice.actions;

export const setTimedSuccessNotif = (message) => {
  return (dispatch) => {
    dispatch(setSuccessNotif(message));
    setTimeout(() => {
      dispatch(removeSuccessNotif());
    }, 5000);
  };
};

export default successNotifSlice.reducer;
