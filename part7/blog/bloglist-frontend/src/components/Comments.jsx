import CreateComment from "./CreateComment";

const Comments = ({ blogUser, blogId, comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <CreateComment blogId={blogId} blogUser={blogUser} />
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
