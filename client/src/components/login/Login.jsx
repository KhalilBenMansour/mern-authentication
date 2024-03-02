import { useRef, useState, useEffect, useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthProvider";

const LOGIN_URL = "/auth";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, { email, password: pwd });
      console.log(response);
      const accessToken = response?.data?.accessToken;
      setAuth({ email, pwd, accessToken });

      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status == 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
    }
  }
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section className="login">
          <p className={errMsg ? "err-msg" : "offscreen"}>{errMsg}</p>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
                value={email}
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
                value={pwd}
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
      )}
    </>
  );
}
