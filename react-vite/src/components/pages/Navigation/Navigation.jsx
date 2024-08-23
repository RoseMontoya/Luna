import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import { useSelector } from "react-redux";


function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <>
    {user? (
      <nav id="logged-in-nav">
        <div>
          <button id="add-button"><FaPlus /></button>
        </div>
        <div id="nav-container">
          <h1 style={{fontWeight: 'normal'}}>Welcome back, {user.firstName}</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="entries">Entries</NavLink>
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
