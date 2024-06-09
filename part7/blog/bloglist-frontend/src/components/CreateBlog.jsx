import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks/useField";

const CreateBlog = ({ togglableRef }) => {
  const dispatch = useDispatch();
  const [titleObj, resetTitle] = useField("text");
  const [authorObj, resetAuthor] = useField("text");
  const [urlObj, resetUrl] = useField("text");

  const create = async (event) => {
    event.preventDefault();
    const blog = {
      title: titleObj.value,
      author: authorObj.value,
      url: urlObj.value,
    };
    togglableRef.current.toggleVisibility();
    dispatch(
      createBlog(
        blog,
        `successfully created '${blog.title}'`,
        `error when creating '${blog.title}'`
      )
    );
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          title:
          <input {...titleObj} name="title" placeholder="title" />
        </div>
        <div>
          author:
          <input {...authorObj} name="author" placeholder="author" />
        </div>
        <div>
          url:
          <input {...urlObj} name="url" placeholder="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
