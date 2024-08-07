import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { username } from "../App";

const Navbar = () => {
  const { currentuser, logout} = useContext(username);
  return (
    <nav>
      <div className="leftbar">
        <Link to="/">Home</Link>
        {currentuser && <Link to="/Forum">Forum</Link>}
      </div>
      <div className="rightbar">
        {currentuser ? (
          <>  
            <Link to="/Profile">My accout</Link>
            <Link to="/" onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/Signup">Sign up</Link>
            <Link to="/Login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
