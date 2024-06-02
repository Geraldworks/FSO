import { createSlice } from "@reduxjs/toolkit";

// Creating Initial States
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const oldAnec = state.find((anec) => anec.id === id);
      const newAnec = {
        ...oldAnec,
        votes: oldAnec.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : newAnec));
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// Expose both named exports and default export
export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
