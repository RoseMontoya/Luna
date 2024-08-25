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

    dispatch( login({
        email,
        password,
      }))
      .then(() => {
          navigate("/");
      })
      .catch(async res => {
        const errs = await res.json()
        setErrors(errs);
      })

  };

  const demoLogIn = async() => {
    await setEmail("bonnibel.bubblegum@candykindgom.com")
    await setPassword("sweetscience123")

    dispatch( login({
      email: "bonnibel.bubblegum@candykindgom.com",
      password: "sweetscience123",
    }))
    .then(() => {
        navigate("/");
    })
    .catch(async res => {
      const errs = await res.json()
      setErrors(errs);
    })
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
        <button onClick={e => {demoLogIn(e); handleSubmit(e)}}>Log in as demo user</button>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
