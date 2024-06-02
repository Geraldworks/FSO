import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// Expose both named exports and default export
export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteCurrAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(voteAnecdote(anecdote.id));
    await anecdoteService.updateAnecdote(newAnecdote);
  };
};
export default anecdoteSlice.reducer;
