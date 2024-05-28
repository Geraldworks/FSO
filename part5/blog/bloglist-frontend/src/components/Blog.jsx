import PropTypes from "prop-types";
import { useState } from "react";

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

const Blog = ({ blog, blogUpdater, blogDeleter }) => {
  const [showDetails, setShowDetails] = useState(false);
  const displayRemove = { display: blogDeleter ? "" : "none" };

  const likeBlog = async () => {
    const newLikes = blog.likes + 1;
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user.id,
    };
    blogUpdater(blogObject);
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
        likes {blog.likes} <button onClick={likeBlog}>like</button>
      </p>
      <p>{blog.user.name}</p>
      <button style={displayRemove} onClick={blogDeleter}>
        remove
      </button>
    </div>
  );
};

Blog.proptypes = {
  blogUpdater: PropTypes.func.isRequired,
  blogDeleter: PropTypes.func.isRequired,
};

export default Blog;
