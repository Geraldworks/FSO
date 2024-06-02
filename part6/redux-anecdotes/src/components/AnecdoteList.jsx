import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { voteAnecNotif, clearAnecNotif } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

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
  const handleUpvote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(voteAnecNotif(anecdote.content));
    await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    setTimeout(() => dispatch(clearAnecNotif()), 5000);
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
