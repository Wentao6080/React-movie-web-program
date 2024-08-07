import { useContext, useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import { verifyInput } from "../data/Data_repository";
import { useNavigate } from "react-router-dom";
import { username } from "../App";

const Login = () => {
  const [User, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {login} = useContext(username)

  const handleonchange = (event) => {
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }));
  };
  const handlesubmit = async (event) => {
    event.preventDefault();

    // check input
    const validInput = verifyInput(User);
    if ("email" in validInput) {
      setErrors(validInput);
      return;
    } else {
      setErrors({});
    }

    // check valid password and email
    const verify = await login(User.email, User.password);
    if (verify !== null) {
      alert("You have successful log in the account, Welcome " + verify.username);
      navigate("/Profile");
      return;
    } else {
      setErrors((errors) => ({
        ...errors,
        valid: "Incorrect email or password",
      }));
      return;
    }
  };
  return (
    <div className="Login">
      <div>
        <h2>Login</h2>
        <form onSubmit={handlesubmit} noValidate>
          <div className="Label">
            <label htmlFor="email">Email: </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleonchange}
              value={User.email || ""}
            />
            {errors.email && <p className="Invalid">{errors.email}</p>}
          </div>
          <div className="Label">
            <label htmlFor="password">Password: </label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleonchange}
              value={User.password || ""}
            />
          </div>
          <Button type="submit" className="butt" variant="primary">
            Login
          </Button>
          {errors.valid && <p className="Invalid">{errors.valid}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
