import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const Blog = () => {
  const user = useSelector(({ user }) => user);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    </div>
  );
};

export default Blog;
