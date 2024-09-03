import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
// import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/session";
// import { useState } from "react";
import { useNav } from "../../../context/navContext";


function Navigation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const { toggleNav, navOpen } = useNav()
  // const toggleButton = () => {
  //   setNavOpen((prevNavOpen) => !prevNavOpen)
  // }



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
        {navOpen?
        <div id="nav-container" >
          <div id="nav-top">
            <button id="logout-btn" onClick={() => dispatch(logout())}>Log out</button>
            <div id="close-btn" onClick={toggleNav}><IoChevronBackOutline /></div>
            <h1 id='welcome-title'>Welcome, {user.firstName}</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="entries" state={{ navOpen }}>Entries</NavLink>
            <NavLink to="levels">Levels</NavLink>
            <NavLink to="activities">Activities</NavLink>
          </div>
          <div id="about">
            <h2 style={{fontSize:"16px"}}>Meet the developer</h2>
            <div style={{alignItems:'center'}}>
              <div className="profile-image"></div>
              <div id="info">
                <p style={{fontSize:"14px"}}>Rose Montoya</p>
                <div style={{justifyContent: 'start', gap:'.5em'}}>
                  <Link to="https://www.linkedin.com/in/rose-montoya/"><FaLinkedin /></Link>
                  <Link to="https://github.com/RoseMontoya"><FaGithub /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <div id="close-btn" onClick={toggleNav}><IoChevronForwardOutline /></div>
        }
      </nav>
    ) : (
      <nav id="logged-out">
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
