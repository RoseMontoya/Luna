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
        setErrors(errs.errors);
      })

  };

  const demoLogIn = async() => {
    setEmail("bonnibel.bubblegum@candykindgom.com")
    setPassword("sweetscience123")
    console.log('inside of login')
    dispatch( login({
      email: "bonnibel.bubblegum@candykindgom.com",
      password: "sweetscience123",
    }))
    .then(() => {
        navigate("/");
    })
    .catch(async res => {
      const errs = await res.json()
      setErrors(errs.errors);
    })
  }

  return (
    <main id="login-page">
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} id="login-form">
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
        {errors.password? <p className={`${errors.password? 'error': "hidden-error" } `}>{errors.password}</p> : <p className={`${errors.credentials? 'error': "hidden-error" } `}>{errors.credentials}</p>}

        </label>

        <button className="submit-btn" onClick={e => {demoLogIn(e)}} style={{marginBottom: '1.5em'}}>Log in as demo user</button>
        <button className="submit-btn" type="submit">Log In</button>
      </form>
    </main>
  );
}

export default LoginFormPage;
