/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import SuccessNotification from "./components/Success";
import ErrorNotification from "./components/Error";
import Togglable from "./components/Toggleable";
import Blogs from "./components/Blogs";
import { useSelector, useDispatch } from "react-redux";
import { intializeBlogs } from "./reducers/blogsReducer";
import { checkForCredentials, logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogCreationRef = useRef();

  useEffect(() => {
    dispatch(intializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(checkForCredentials());
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to Application</h2>
        <ErrorNotification />
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification />
      <ErrorNotification />
      <p>
        {user.name} logged in{" "}
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogCreationRef}>
        <CreateBlog togglableRef={blogCreationRef} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
