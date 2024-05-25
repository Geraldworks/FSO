import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import SuccessNotification from "./components/Success";
import ErrorNotification from "./components/Error";
import Togglable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const blogCreationRef = useRef();

  // function to get all blogs from the database
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  // function to check if a user is logged is already
  useEffect(() => {
    const userCreds = window.localStorage.getItem("loggedBlogappUser");

    if (userCreds) {
      const user = JSON.parse(userCreds);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // function to handle logging in
  const handleLogin = async (userCreds) => {
    try {
      const user = await loginService.login(userCreds);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // function to handle logging out
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  // function to handle blog creation
  const handleCreation = async (blog) => {
    try {
      const blogObject = await blogService.create(blog);
      blogCreationRef.current.toggleVisibility();
      setSuccessMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setBlogs(blogs.concat(blogObject));
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("an error occured when adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleUpdate = async (blogId, blogToUpdate) => {
    const blogUpdaterHandler = blogService.updateBlog(blogId);
    try {
      await blogUpdaterHandler(blogToUpdate);
      const blogToReplace = blogs.find((blog) => blog.id === blogId);
      const filteredBlogs = blogs.filter((blog) => blog.id !== blogId);
      const newBlogs = filteredBlogs.concat({
        ...blogToUpdate,
        id: blogId,
        user: blogToReplace.user,
      });
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes));
    } catch {
      setErrorMessage("error when updating blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDeletion = async (blogToDelete) => {
    const blogRemoverHandler = blogService.deleteBlog(blogToDelete.id);
    const confirm = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );
    if (confirm) {
      try {
        await blogRemoverHandler();
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      } catch (exception) {
        setErrorMessage("blog cannot be deleted; you do not own this blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to Application</h2>
        <ErrorNotification message={errorMessage} />
        <Login login={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogCreationRef}>
        <CreateBlog create={handleCreation} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogUpdater={(updatedBlog) => handleUpdate(blog.id, updatedBlog)}
          blogDeleter={
            blog.user.username === user.username
              ? () => handleDeletion(blog)
              : null
          }
        />
      ))}
    </div>
  );
};

export default App;
