import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./register.css";
import { useState, useEffect, useRef } from "react";
import validator from "validator";
import axios from "../../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [initialRender, setInitialRender] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
    setInitialRender(false);
  }, []);
  useEffect(() => {
    if (!initialRender) {
      passRef.current.focus();
    }
  }, [showPass]);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);
  useEffect(() => {
    // setValidEmail(emailRef.current.validity.valid);
    setValidEmail(validator.isEmail(email));
  }, [email]);

  useEffect(() => {
    setValidPass(PWD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    setErrMsg("");
  }, [name, password, email]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePassChange(e) {
    setPassword(e.target.value);
  }
  // name class
  let classInput,
    classLabel = "";
  if (nameFocus) {
    classInput = "focus-input";
    classLabel = "focus-label";
  }
  if (name && !validName) {
    classInput = "red-input";
    classLabel = "red-label";
  }
  if (validName) {
    classInput = "green-input";
    classLabel = "green-label";
  }
  // email class
  let classInputemail,
    classLabelemail = "";
  if (emailFocus) {
    classInputemail = "focus-input";
    classLabelemail = "focus-label";
  }
  if (email && !validEmail) {
    classInputemail = "red-input";
    classLabelemail = "red-label";
  }
  if (email && validEmail) {
    classInputemail = "green-input";
    classLabelemail = "green-label";
  }
  //password class
  let classInputpass,
    classLabelpass = "";
  if (passFocus) {
    classInputpass = "focus-input";
    classLabelpass = "focus-label";
  }
  if (password && !validPass) {
    classInputpass = "red-input";
    classLabelpass = "red-label";
  }
  if (password && validPass) {
    classInputpass = "green-input";
    classLabelpass = "green-label";
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrMsg("All fields are required");
      return;
    }

    if (!validName || !validPass || !validEmail) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        name,
        email,
        password,
      });
      console.log(response);
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log("Error:", e);
      if (!e?.response) {
        setErrMsg("No Server Response");
      } else if (e.response.status == 409) {
        setErrMsg(e.response.data.message);
      } else {
        setErrMsg("Registration Failed");
      }
    }
  }
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <Link to={`../login`}>Login</Link>
        </section>
      ) : (
        <section className="reg">
          <p className={errMsg ? "err-msg" : "offscreen"}>{errMsg}</p>
          <h2>Register</h2>
          <p>Let's get started with your 30 days free trial</p>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <input
                className={classInput}
                type="text"
                id="name"
                autoComplete="off"
                ref={nameRef}
                onChange={handleNameChange}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
              <label htmlFor="name" className={classLabel}>
                Name
              </label>
            </div>
            <p className={!validName && name ? "instruction" : "offscreen"}>
              3 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <div className="form-input">
              <input
                className={classInputemail}
                type="email"
                id="email"
                autoComplete="off"
                ref={emailRef}
                onChange={handleEmailChange}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <label htmlFor="email" className={classLabelemail}>
                Email
              </label>
            </div>
            <p className={!validEmail && email ? "instruction" : "offscreen"}>
              It must be a valid Email
            </p>
            <div className="form-input">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                ref={passRef}
                className={classInputpass}
                onChange={handlePassChange}
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
              />
              <label htmlFor="password" className={classLabelpass}>
                Password
              </label>
              <FontAwesomeIcon
                icon={showPass ? faEye : faEyeSlash}
                onClick={() => setShowPass(!showPass)}
              />
            </div>
            <div
              className={!validPass && password ? "pass-err-msgs" : "offscreen"}
            >
              <p
                className="msg"
                style={{ color: /\d/.test(password) ? "green" : "" }}
              >
                {/\d/.test(password) ? "✔️" : "❌"} At least one numeric
                character
              </p>
              <p
                className="msg"
                style={{ color: /[a-z]/.test(password) ? "green" : "" }}
              >
                {/[a-z]/.test(password) ? "✔️" : "❌"} At least one lowercase
                character
              </p>
              <p
                className="msg"
                style={{ color: /[A-Z]/.test(password) ? "green" : "" }}
              >
                {/[A-Z]/.test(password) ? "✔️" : "❌"} At least one uppercase
                character
              </p>
              <p
                className="msg"
                style={{ color: /[!@#$%]/.test(password) ? "green" : "" }}
              >
                {/[!@#$%]/.test(password) ? "✔️" : "❌"} At least one special
                character
              </p>
              <p
                className="msg"
                style={{ color: /.{8,24}/.test(password) ? "green" : "" }}
              >
                {/.{8,24}/.test(password) ? "✔️" : "❌"} Password length between
                8 and 24
              </p>
            </div>
            <button type="submit">Register</button>
          </form>
          <div>
            <span>Already a user? </span>
            <Link to={`../login`}>Login</Link>
          </div>
        </section>
      )}
    </>
  );
}
