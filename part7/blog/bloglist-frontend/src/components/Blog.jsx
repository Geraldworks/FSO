import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const ToggleButton = ({ handler, buttonText }) => {
  return <button onClick={handler}>{buttonText}</button>;
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const [showDetails, setShowDetails] = useState(false);
  const displayRemove = { display: deleteBlog ? "" : "none" };

  const handleDeleteBlog = () => {
    dispatch(
      deleteBlog(blog.id)(
        `successfully removed '${blog.title}'`,
        `error when removing '${blog.title}'`
      )
    );
  };

  if (!showDetails) {
    return (
      <div style={blogStyle} className="title-author-unclicked">
        <p>
          {blog.title} {blog.author}{" "}
          <ToggleButton
            handler={() => setShowDetails(!showDetails)}
            buttonText="view"
          />
        </p>
      </div>
    );
  }

  return (
    <div style={blogStyle} className="title-author-clicked">
      <p>
        {blog.title} {blog.author}{" "}
        <ToggleButton
          handler={() => setShowDetails(!showDetails)}
          buttonText="hide"
        />
      </p>
      <p className="url">{blog.url}</p>
      <p className="likes">
        likes {blog.likes}{" "}
        <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
      </p>
      <p>{blog.user.name}</p>
      {user.username === blog.user.username ? (
        <button style={displayRemove} onClick={handleDeleteBlog}>
          remove
        </button>
      ) : null}
    </div>
  );
};

// need to check if the person owns the blogs
Blog.proptypes = {
  blogUpdater: PropTypes.func.isRequired,
  blogDeleter: PropTypes.func.isRequired,
};

export default Blog;
