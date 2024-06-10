import Toggleable from "../components/Toggleable";
import CreateBlog from "../components/CreateBlog";
import SuccessNotification from "../components/Success";
import ErrorNotification from "../components/Error";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, List } from "antd";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blogs = () => {
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const togglableReference = useRef();

  return (
    <div>
      <SuccessNotification />
      <ErrorNotification />
      <h2>Blogs</h2>
      {user === null ? null : (
        <div>
          <Toggleable buttonLabel="create new" ref={togglableReference}>
            <CreateBlog togglableRef={togglableReference} />
          </Toggleable>
        </div>
      )}
      <Divider orientation="left">Available Blogs</Divider>
      <List
        dataSource={blogs}
        renderItem={(blog) => (
          <List.Item>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Blogs;
