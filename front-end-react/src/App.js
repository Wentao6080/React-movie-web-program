import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { createContext, useState } from "react";
import ChangeProfile from "./pages/ChangeProfile";
import Footer from "./components/Footer";
import Forum from "./pages/Forum";
import { getUser } from "./data/Data_repository";


export const username = createContext(null);

function App() {
  const [currentuser, setUser] = useState();
 

  const logout = () => {
    setUser("")
  }
  
  const login =async (name, password) => {
    const current_user = await getUser(name, password);
    setUser(current_user);
    return current_user
  }

  // always get user and return to home page after refresh
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")))

  // }, [])
  
 

  return (
    <div className="App">
      <username.Provider value={{currentuser, logout, login, setUser}}>
      <Router>
        <header>
          <Header />
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Edit" element={<ChangeProfile/>}/>
            <Route path="/Forum" element={<Forum/>}/>
          </Routes>
        </main>
      </Router>
      </username.Provider>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
