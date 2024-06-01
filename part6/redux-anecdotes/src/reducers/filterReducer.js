const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const createFilter = (currFilter) => {
  return {
    type: "SET_FILTER",
    payload: currFilter,
  };
};

export default filterReducer;
