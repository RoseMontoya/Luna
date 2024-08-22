import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import { useSelector } from "react-redux";


function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <>
    {user? (
      <nav id="logged-in-nav">
        <div id="nav-container">
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
