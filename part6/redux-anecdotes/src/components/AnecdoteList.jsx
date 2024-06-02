import { useDispatch, useSelector } from "react-redux";
import { voteCurrAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anec) => anec.content.includes(filter));
  });
  const handleUpvote = (anecdote) => {
    dispatch(voteCurrAnecdote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };
  return (
    <div>
      {anecdotes
        .map((note) => note)
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => handleUpvote(anecdote)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
