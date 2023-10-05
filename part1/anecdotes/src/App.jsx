import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [highest, setHighest] = useState(0);

  const handleSelected = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const handleVotes = () => {
    let votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);

    // handle highest
    const highestVote = Math.max(...votesCopy)
    const highestIndex = votesCopy.indexOf(highestVote)
    setHighest(highestIndex)
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button handleClick={handleVotes} text="vote" />
      <Button handleClick={handleSelected} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[highest]}</div>
      <div>has {votes[highest]} votes</div>
    </div>
  );
};

export default App;
