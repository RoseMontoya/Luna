import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import * as Icons from "react-icons/fa6";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIcons } from "../../../redux/session"

function Navigation() {
  // const iconsObj = useSelector(state => state.session.icons)
  // const dispatch = useDispatch()
  // const icons = iconsObj? Object.values(iconsObj) : []
  // console.log(Icons.FaBook)
  const user = useSelector(state => state.session.user)


  // useEffect(() => {
  //   if (!iconsObj) {
  //     dispatch(getIcons())
  //   }
  // }, [iconsObj, dispatch])

  // if (!iconsObj) return null

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
