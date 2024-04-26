import "./LoginRegister.css";
import { useState, useEffect } from "react";
import axios from "axios";

const LogReg = () => {
  const url = "http://localhost:8000/api";
  const [activeForm, setActiveForm] = useState('login');
  const switchForm = (form) => {
    setActiveForm(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessageRegister, setErrorMessageRegister] = useState(null);


  async function isUserExist() {
    const result = await axios.post(url + "/accounts/isvalid", {
      email: email,
      password: password,
    });
    return result;
  }

  async function handleSubmitRegister() {
    if (!isUserExist) {
      const result = await axios.post(url + "/accounts/create", {
        email: email,
        password: password,
      });
      return result;
    } else {
      setErrorMessageRegister("This email is already register");
    }
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
                onClick={handleSubmitRegister}
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
