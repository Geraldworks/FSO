/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { intializeBlogs } from "./reducers/blogsReducer";
import { checkForCredentials, logout } from "./reducers/userReducer";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Blogs from "./views/Blogs";
import Blog from "./views/Blog";
import Users from "./views/Users";
import User from "./views/User";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(intializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(checkForCredentials());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate(location.pathname);
  };

  const navStyle = { padding: 5 };

  return (
    <div>
      <div style={{ background: "#FFFF00", marginBottom: 10 }}>
        <Link style={navStyle} to="/">
          home
        </Link>
        <Link style={navStyle} to="/blogs">
          blogs
        </Link>
        <Link style={navStyle} to="/users">
          users
        </Link>
        {user === null ? (
          <Link style={navStyle} to="/login">
            login
          </Link>
        ) : (
          <em style={navStyle}>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </em>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
