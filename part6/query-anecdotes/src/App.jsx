import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anec) =>
          anec.id === updatedAnecdote.id ? updatedAnecdote : anec
        )
      );
    },
  });

  // if there is an error
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  // if the data is still loading from the server
  if (result.isLoading) {
    return <div>loading data... </div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    updateAnecdoteMutation.mutate(updatedAnecdote);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
