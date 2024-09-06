import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signup } from "../../../redux";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // First Name Validations
    if (firstName.length > 30) {
      // If first name is too long, disallow any more characters to be add and give error message to let user know why.
      setFirstName(firstName.slice(0, -1));
      setErrors((prev) => ({
        ...prev,
        firstName: "Cannot be longer than 30 characters.",
      }));
    }

    if (lastName.length > 75) {
      // If last name is too long, disallow any more characters to be add and give error message to let user know why.
      setLastName(lastName.slice(0, -1));
      setErrors((prev) => ({
        ...prev,
        lastName: "Cannot be longer than 75 characters.",
      }));
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
    }

    // Clear errors that are no longer applicable
    if (30 > firstName.length && firstName.length > 2) {
      setErrors((prev) => {
        // delete prev.firstName
        const { firstName, ...rest } = prev;
        return rest;
      });
    }

    if (75 > lastName.length && lastName.length > 2) {
      setErrors((prev) => {
        // delete prev.lastName
        const { lastName, ...rest } = prev;
        return rest;
      });
    }

    if (password.length > 5) {
      setErrors((prev) => {
        // delete prev.password
        const { password, ...rest } = prev;
        return rest;
      });
    }

    if (email) {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }

    if (password === confirmPassword) {
      setErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
  }, [firstName, lastName, email, password, confirmPassword]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!firstName || firstName.length < 3)
      errs.firstName = "Must be at least 2 characters long.";
    if (!lastName || lastName.length < 3)
      errs.lastName = "Must be at least 2 characters long.";
    if (!password || password.length < 7)
      errs.password = "Password must be at least 6 characters.";
    if (!email) errs.email = "Email is required.";

    if (Object.values(errs).length) return setErrors(errs);
    else setErrors({});

    dispatch(
      signup({
        firstName,
        lastName,
        email,
        password,
      })
    )
      .then(() => {
        navigate("/");
      })
      .catch(async (res) => {
        const errs = await res.json();
        setErrors(errs.errors);
      });
  };

  return (
    <main id="signup-page">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} id="signup-form">
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p className={`${errors.firstName ? "error" : "hidden-error"} `}>
            {errors.firstName}
          </p>
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <p className={`${errors.lastName ? "error" : "hidden-error"} `}>
            {errors.lastName}
          </p>
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={`${errors.email ? "error" : "hidden-error"} `}>
            {errors.email}
          </p>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={`${errors.password ? "error" : "hidden-error"} `}>
            {errors.password}
          </p>
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p
            className={`${errors.confirmPassword ? "error" : "hidden-error"} `}
          >
            {errors.confirmPassword}
          </p>
        </label>
        <button className="submit-btn" type="submit">
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default SignupFormPage;
