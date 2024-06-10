import ErrorNotification from "../components/Error";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div>
      <ErrorNotification />
      <h2>Login to Blog Application</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
