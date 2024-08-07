import { useContext, useEffect, useRef, useState } from "react";
import { deleteUser } from "../data/Data_repository";
import "./Profile.css";
import { username } from "../App";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [display, setDisplay] = useState(false);
  const popBox = useRef(null);
  const {currentuser, logout} = useContext(username);
  const navigate = useNavigate();

 
  // display a popbox for informing delete user
  const handleonclick = (event) => {
    if (display === false) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  // cancel the popbox
  const handleBack = (event) => {
    if (event.target.id === "mo"){
      if (display === false) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }

  // delete user
  const handleDelete = (event) => {
    deleteUser(currentuser.email)
    logout()
    navigate("/")
  }

  // edit profile
  const handleEdit = (event) => {
    navigate("/Edit")
  }

  // show popbox
  useEffect(() => {
    if (display === true) {
      popBox.current.style.display = "block";
    } else {
      popBox.current.style.display = "none";
    }
  }, [display]);

  return (
    <div className="Profile">
      <div className="Content">
        <h2>My Profile: </h2>
        <div className="Information">
          <div className="Left-infor">
            <span className="material-icons">account_circle</span>
            <div className="Name_Email">
              <p className="Username">{currentuser.username}</p>
              <p className="Email">{currentuser.email}</p>
            </div>
          </div>

          <div className="Edit">
            <button onClick={handleEdit}>
              <span className="material-icons" id="edit">
                edit
              </span>
            </button>
            <button onClick={handleonclick}>
              <span className="material-icons" id="delete">
                delete
              </span>
            </button>
          </div>
        </div>
        <hr />
        <p className="Joindate">
          <b>Joined date:</b> {currentuser.joindate}
        </p>
      </div>
      <div className="model" ref={popBox}  id="mo" onClick={handleBack} >
        <div className="model-content"  >
          <h3 >Delete my Account</h3>
          <p >Confirm to delete your account</p>
          <div className="delet-butt">
          <button onClick={handleonclick} id="Cancel">Cancel</button>
          <button onClick={handleDelete} id="Confirm">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
