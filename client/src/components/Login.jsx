import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h2>Login</h2>
      <form action="">
        <div className="form-input">
          <label htmlFor="email">email</label>
          <input type="email" id="email" />
        </div>
        <div className="form-input">
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Log in</button>
      </form>
      <div>
        <span>Need an account? </span>
        <Link to={`../register`}>Register</Link>
      </div>
    </>
  );
}
