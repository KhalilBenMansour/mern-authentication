import { useRef, useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <section className="login">
      <h2>Login</h2>
      <form action="">
        <div className="form-input">
          <label
            htmlFor="email"
            className={(emailFocus || email) && "focus-label"}
          >
            email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className={(emailFocus || email) && "focus-input"}
          />
        </div>
        <div className="form-input">
          <label
            htmlFor="password"
            className={(pwdFocus || pwd) && "focus-label"}
          >
            password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className={(pwdFocus || pwd) && "focus-input"}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      <div>
        <span>Need an account? </span>
        <Link to={`../register`}>Register</Link>
      </div>
    </section>
  );
}
