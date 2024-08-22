import { useState } from "react";
import { login } from "../../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('in handle submit', email, password)

    dispatch( login({
        email,
        password,
      }))
      .then(serverResponse => {
          navigate("/");
      })
      .catch(async res => {
        const errs = await res.json()
        setErrors(errs);
        console.log(errors)
      })

  };

  const demoLogIn = async(e) => {
    await setEmail("bonnibel.bubblegum@candykindgom.com")
    await setPassword("sweetscience123")
    console.log('email', email)
    handleSubmit(e)
  }

  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button onClick={e => demoLogIn(e)}>Log in as demo user</button>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
