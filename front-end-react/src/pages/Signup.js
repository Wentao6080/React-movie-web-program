import { useContext, useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import { verifyInput, storeUser, verifyUnique } from "../data/Data_repository";
import { useNavigate } from "react-router-dom";
import { username } from "../App";

const Signup = () => {
  // set join date
  const [User, setUser] = useState({date: new Date().toString().slice(0,15)});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {login} = useContext(username)


  const handleonchange = (event) => {
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }));
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    // check the input is valid
    const validInput = verifyInput(User);
    if (Object.keys(validInput).length !== 0) {
      setErrors(validInput);
      
      return;
    }
    else {
      setErrors({})
    }

    // check if the email and username has already signed up
    const check = await verifyUnique(User);
    console.log(check)
      if (check !== "succesful") {
        setErrors((errors) => ({
          ...errors,
          valid: check,
        }));
        return;
      }
    // }
    setErrors({})
    // if everything is ok, push the accout to database
    await storeUser(User);
    await login(User.email, User.password);
    alert("You have successful signed up the account");
    navigate("/Profile");
  };
  return (
    <div className="Signup">
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handlesubmit} noValidate>
          <div className="Label">
            <label htmlFor="name">Name: </label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleonchange}
              value={User.name || ""}
            />
            {errors.name && <p className="Invalid">{errors.name}</p>}
          </div>
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
            {errors.password && <p className="Invalid">{errors.password}</p>}
          </div>
          <Button type="submit" className="butt" variant="primary">
            Sign up
          </Button>
          {errors.valid && <p className="Invalid">{errors.valid}</p>}
        </form>
      </div>
    </div>
  );
};
export default Signup;
