import { useState, useContext } from "react";
import { changeDetail, verifyInput, verifyUnique } from "../data/Data_repository";
import "./ChangeProfile.css";
import { useNavigate } from "react-router-dom";
import { username } from "../App";
const ChangeProfile = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const { currentuser, setUser} = useContext(username);
  

  const handleonchange = (event) => {
    setValues((value) => ({ ...value, [event.target.name]: event.target.value }));

  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const e = verifyInput(values)
    setErrors({})
    // verify input if the input is not empty
    if (!values.password && !values.name) {
        setErrors((error) => ({...error, password: e.password}))
        setErrors((error) => ({...error, name: e.name}))
        return
        }
    

    if (values.password || values.name) {
        setErrors((error) => ({...error, password: e.password}))
        setErrors((error) => ({...error, name: e.name}))
        if ((e.password && values.password) || (values.name && e.name)){
            return
        }
    }

    // check for unique username
    const unique = await verifyUnique({name: values.name});
    if (unique !== "succesful") {
      setErrors((error) => ({...error, name: "The name has been created"}))
      return
    }

    // change and reset user
    const changeData = {...values, origin: currentuser.username}
    const newUser = await changeDetail(changeData)
    setUser(newUser)
    navigate("/Profile")


  }
  return (
    <div className="Change">
      <div className="Content1">
        <h2>Edit My Profile: </h2>
        <form onSubmit={handlesubmit} noValidate>
          <label>New Name: </label>
          <br />
          <input name="name" onChange={handleonchange} value={values.name || ""}/>
          {errors.name && <p className="Invalid">{errors.name}</p>}
          <br />
          <label>New Password: </label>
          <br />
          <input name="password" type="password" onChange={handleonchange} value={values.password || ""}/>
          {errors.password && <p className="Invalid">{errors.password}</p>}
          <br />
          <button className="butt">Save</button>
          <p className="tips">Tips: Leave empty if you do not want to change</p>
        </form>
      </div>
    </div>
  );
};

export default ChangeProfile;
