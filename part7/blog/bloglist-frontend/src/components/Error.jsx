import { useSelector } from "react-redux";

const Notification = () => {
  const content = useSelector(({ error }) => error);

  if (content === "") {
    return null;
  }

  return <div className="error">{content}</div>;
};

export default Notification;
