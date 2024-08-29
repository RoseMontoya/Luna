import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
// import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/session";


function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  return (
    <>
    {user? (
      <nav id="logged-in-nav">
        <div>
          <button id="add-button" onClick={() => navigate('/entries/new')}>
            <p id="add-entry">Create new entry</p>
            <FaPlus />
            </button>
        </div>
        <div id="nav-container">
          <div id="nav-top">
            <h1 id='welcome-title'>Welcome back, {user.firstName}</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="entries">Entries</NavLink>
          </div>
          <div>
            <button id="logout-btn" onClick={() => dispatch(logout())}>Log out</button>
          </div>
        </div>
      </nav>
    ) : (
      <nav>
          <NavLink to="/">Home</NavLink>
        <div>
          <NavLink to='login'>Log in</NavLink>
          <NavLink to='signup'>Sign up</NavLink>
        </div>
      </nav>
    )}
    </>
  );
}


export default Navigation;
