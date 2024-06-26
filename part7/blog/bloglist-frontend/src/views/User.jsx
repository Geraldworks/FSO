import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);
  const userId = useParams().id;
  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await userService.getOne(userId);
      setUser(userInfo);
    };
    getProfile();
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
