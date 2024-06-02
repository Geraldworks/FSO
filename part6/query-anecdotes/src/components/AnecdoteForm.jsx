import { createAnecdote } from "../requests";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSetNotifAndTimeout } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notifDispatch = useSetNotifAndTimeout();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      notifDispatch(`anecdote '${newAnecdote.content}' created`);
    },
    onError: ({ response }) => {
      notifDispatch(response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
