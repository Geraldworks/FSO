import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogsReducer";
import { setTimedErrorNotif } from "../reducers/errorNotifReducer";
import { setTimedSuccessNotif } from "../reducers/successNotifReducer";
import blogService from "../services/blogs";

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
      <form onSubmit={handleSubmit}>
        <input {...commentObj} />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default CreateComment;
