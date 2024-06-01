import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => dispatch(voteAnecdote(anecdote.id))}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
