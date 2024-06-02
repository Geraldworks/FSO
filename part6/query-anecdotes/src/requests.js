import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

// return the data you want to see as part of the 'data' field in the useQuery
export const getAnecdotes = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};

export const createAnecdote = async (newObj) => {
  const newAnecdote = await axios.post(baseUrl, newObj);
  return newAnecdote.data;
};

export const updateAnecdote = async (newObj) => {
  const updatedAnecdote = await axios.put(`${baseUrl}/${newObj.id}`, newObj);
  return updatedAnecdote.data;
};
