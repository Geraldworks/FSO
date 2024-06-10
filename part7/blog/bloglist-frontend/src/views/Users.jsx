import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const setUp = async () => {
      const usersFromDb = await userService.getAll();
      setUsers(usersFromDb);
    };
    setUp();
  });

  return (
    <div>
      <h2>All User Information</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>users</strong>
            </td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
