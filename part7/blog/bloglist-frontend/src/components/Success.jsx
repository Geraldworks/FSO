import { useSelector } from "react-redux";

const Notification = () => {
  const content = useSelector(({ success }) => success);

  if (content === "") {
    return null;
  }

  return <div className="success">{content}</div>;
};

export default Notification;
