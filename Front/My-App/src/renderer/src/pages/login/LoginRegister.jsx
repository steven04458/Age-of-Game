import "./LoginRegister.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LogReg = () => {
  const url = "http://127.0.0.1:8000/";
  const [activeForm, setActiveForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const switchForm = (form) => {
    setActiveForm(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeForm === "login") {
        const response = await axios.post(`${url}api/login`, {
          name: email,
          password: password,
        });
        const { status, data } = response;
        if (status === 200) {
          const { token, name, score } = data; 
          localStorage.setItem("token", token);
          localStorage.setItem("username", name);
          localStorage.setItem("score", score);
          setLoggedIn(true);
        }
      } else {
        const response = await axios.post(`${url}api/register`, {
          name: email,
          password: password,
          confirmPassword: confirmPassword,
        });
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error.response.status);
    }
  };

  // Si loggedIn est true, redirigez l'utilisateur vers une autre page
  if (loggedIn) {
    return <Navigate to="/App" />;
  }

  return (
    <>
      <section className="forms-section">
        <h3 className="section-title">Connecter à Age of Game :</h3>
        <div className="forms">
          <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
            <button type="button" className="switcher switcher-login" onClick={() => switchForm('login')}>
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login" onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  entre ton Nom et le mot de passe pour te connecter
                </legend>
                <div className="input-block">
                  <label htmlFor="login-email">Names</label>
                  <input
                    id="login-email"
                    type="text"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">mot de passe</label>
                  <input
                    id="login-password"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </div>
              </fieldset>
              <button type="submit" className="btn-login">
                Login
              </button>
            </form>
          </div>
          <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
            <button type="button" className="switcher switcher-signup" onClick={() => switchForm('signup')}>
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup" onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  Entre ton Nom, mot de passe et le mot de passe de
                  confirmation
                </legend>
                <div className="input-block">
                  <label htmlFor="signup-email">Names</label>
                  <input
                    id="signup-email"
                    type="text"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">mot de passe</label>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password-confirm">
                    confirm mot de passe
                  </label>
                  <input
                    id="signup-password-confirm"
                    type="password"
                    value={confirmPassword}
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  ></input>
                </div>
              </fieldset>
              <button
                type="submit"
                className="btn-signup"
                // onClick={handleSubmitRegister}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogReg;
