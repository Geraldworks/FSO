import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import Comments from "../components/Comments";
import ErrorNotification from "../components/Error";
import SuccessNotification from "../components/Success";

const Blog = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(({ user }) => user);
  const blog = useSelector(({ blogs }) => {
    return blogs.find((blog) => blog.id === params.id);
  });

  const handleDeleteBlog = () => {
    const confirmed = window.confirm(
      "are you sure you want to delete this blog?"
    );
    if (confirmed) {
      dispatch(
        deleteBlog(blog.id)(
          `successfully removed '${blog.title}'`,
          `error when removing ${blog.title}'`
        )
      );
      navigate("/blogs");
    }
  };
  if (!blog) {
    return null;
  }

  return (
    <div>
      <SuccessNotification />
      <ErrorNotification />
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{" "}
        <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
      </p>
      <p>added by {blog.author}</p>
      {user !== null && user.username === blog.user.username ? (
        <button onClick={handleDeleteBlog}>delete blog</button>
      ) : null}
      <Comments
        blogUser={blog.user}
        blogId={blog.id}
        comments={blog.comments}
      />
    </div>
  );
};

export default Blog;
