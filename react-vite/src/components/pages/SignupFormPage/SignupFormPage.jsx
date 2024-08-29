import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signup } from "../../../redux/session";
import './SignupForm.css'

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

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

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
    .catch(async res => {
      const errs = await res.json()
      setErrors(errs.errors)
    })

  };

  return (
    <main id='signup-page'>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} id="signup-form">
      <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
          <p className={`${errors.firstName? 'error': "hidden-error" } `}>{errors.firstName}</p>
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // required
          />
          <p className={`${errors.lastName? 'error': "hidden-error" } `}>{errors.lastName}</p>
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
          <p className={`${errors.email? 'error': "hidden-error" } `}>{errors.email}</p>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <p className={`${errors.password? 'error': "hidden-error" } `}>{errors.password}</p>
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
          <p className={`${errors.confirmPassword? 'error': "hidden-error" } `}>{errors.confirmPassword}</p>
        </label>
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}

export default SignupFormPage;
