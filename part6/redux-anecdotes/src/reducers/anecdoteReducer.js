const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

// Action Creator
export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

// Action Creator
export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: { content },
  };
};

// Helper Function
const getId = () => (100000 * Math.random()).toFixed(0);

// Helper Function
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// Creating Initial States
const initialState = anecdotesAtStart.map(asObject);

// Reducer is a function that manages your Actions
// It has an initial state, and then subsequent Actions
const reducer = (state = initialState, action) => {
  console.log("state before: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE": {
      const id = action.payload.id;
      const oldAnec = state.find((anec) => anec.id === id);
      const newAnec = {
        ...oldAnec,
        votes: oldAnec.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : newAnec));
    }
    case "NEW_ANECDOTE": {
      return [...state, asObject(action.payload.content)];
    }
    default:
      return state;
  }
};

// Expose both named exports and default export
export default reducer;
