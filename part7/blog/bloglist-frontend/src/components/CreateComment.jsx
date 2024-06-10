import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogsReducer";
import { setTimedErrorNotif } from "../reducers/errorNotifReducer";
import { setTimedSuccessNotif } from "../reducers/successNotifReducer";
import blogService from "../services/blogs";
import { Button, Space, Input, Form } from "antd";

const CreateComment = ({ blogId, blogUser }) => {
  const [commentObj, resetComment] = useField("text");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentObj.value !== "") {
      resetComment();
      try {
        const newBlog = await blogService.createComment(
          blogId,
          commentObj.value
        );
        newBlog.user = blogUser;
        dispatch(updateBlog(newBlog));
        dispatch(setTimedSuccessNotif("successfully commented"));
      } catch (exception) {
        dispatch(setTimedErrorNotif("comment unsuccessful; server error"));
      }
    } else {
      dispatch(
        setTimedErrorNotif("comment unsuccessful; please input something")
      );
    }
  };
  return (
    <div>
      <Form>
        <Input {...commentObj}></Input>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            add comment
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default CreateComment;
