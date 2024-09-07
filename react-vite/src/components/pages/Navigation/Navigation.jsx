import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../redux";
import { useNav } from "../../../context/navContext";

// Design Imports
import { FaPlus, FaLinkedin, FaGithub } from "react-icons/fa6";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toggleNav, navOpen } = useNav();
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {user ? (
        // Navigation for logged in user
        <nav id="logged-in-nav">
          <div>
            <button id="add-button" onClick={() => navigate("/entries/new")}>
              <p id="add-entry">Create new entry</p>
              <FaPlus />
            </button>
          </div>
          {/* if nav bar is open */}
          {navOpen ? (
            <div id="nav-container">
              <div id="nav-top">
                <button id="logout-btn" onClick={() => dispatch(logout())}>
                  Log out
                </button>
                <div id="close-btn" onClick={toggleNav}>
                  <IoChevronBackOutline />
                </div>
                <h1 id="welcome-title">Welcome, {user.firstName}</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="entries" state={{ navOpen }}>
                  Entries
                </NavLink>
                <NavLink to="levels">Levels</NavLink>
                <NavLink to="activities">Activities</NavLink>
              </div>

              {/* About section */}
              <div id="about">
                <h2 style={{ fontSize: "16px" }}>Meet the developer</h2>
                <div style={{ alignItems: "center" , minHeight: "4em"}}>
                  <div className="profile-image"><div></div></div>
                  <div id="info">
                    <p style={{ fontSize: "14px" }}>Rose Montoya</p>
                    <div style={{ justifyContent: "start", gap: ".5em" }}>
                      <Link to="https://www.linkedin.com/in/rose-montoya/">
                        <FaLinkedin />
                      </Link>
                      <Link to="https://github.com/RoseMontoya">
                        <FaGithub />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="close-btn" onClick={toggleNav}>
              <IoChevronForwardOutline />
            </div>
          )}
        </nav>
      ) : (
        // if no user is logged in
        <nav id="logged-out">
          <NavLink to="/">Home</NavLink>
          <div>
            <NavLink to="login">Log in</NavLink>
            <NavLink to="signup">Sign up</NavLink>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
