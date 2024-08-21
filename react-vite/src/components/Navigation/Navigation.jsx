import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import * as Icons from "react-icons/fa6";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIcons } from "../../redux/session"

function Navigation() {
  const iconsObj = useSelector(state => state.session.icons)
  const dispatch = useDispatch()
  const icons = iconsObj? Object.values(iconsObj) : []
  console.log(Icons.FaBook)


  useEffect(() => {
    if (!iconsObj) {
      dispatch(getIcons())
    }
  }, [iconsObj, dispatch])

  if (!iconsObj) return null

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {icons.map(icon => {
      const IconComponent = Icons[icon.name]
      console.log(IconComponent)
      return (

        <p><IconComponent /></p>
      )})}
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}


export default Navigation;
