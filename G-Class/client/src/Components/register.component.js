import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import google from '../Icons/googlr.png';

const URL = process.env.REACT_APP_BACKEND_URL;
const Register = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordConfirmation, setInputPasswordConfirmation] =
    useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [error, setError] = useState([]);

  //Register the user
  const Submit = async e => {
    e.preventDefault();

    if (error === '') {
      await Axios.post(`${URL}/users/register`, {
        email: inputEmail,
        username: inputUsername,
        password: inputPassword,
      })
        .then(res => {
          const token = new Cookies();
          token.set('token', res.data.token, { path: '/', maxAge: 604800 });
          //return to home page
          window.location = '/';
        })
        .catch(err => setError(err.response.data.message));
    }
  };

  useEffect(() => {
    if (inputEmail.length > 0) setError('');
  }, [inputEmail]);

  //validating users' input
  useEffect(() => {
    if (inputPassword !== inputPasswordConfirmation)
      setError('Password and confirmation must match.');
    else {
      if (inputUsername.length < 3 && inputUsername.length !== 0)
        setError('Username length should be more than or equal to three');
      else if (inputUsername.length > 50)
        setError('Username length should be less or equal to 50');
      else setError('');
    }
  }, [inputPassword, inputPasswordConfirmation, inputUsername]);

  return (
    <div className="login">
      <div className="contain">
        <div class="form-container sign-up-container">
          <form onSubmit={Submit}>
            <h4 className="form-error">{error}</h4>
            <h1>Sign Up</h1>
            <button type="button" class="login-with-google-btn">
              <img src={google} alt="google" className="google"></img> Sign up
              with Google
            </button>

            <span>or </span>
            <input
              placeholder="Username"
              type="text"
              className="form-control"
              value={inputUsername}
              onChange={({ target: { value } }) => setInputUsername(value)}
            />
            <input
              type="email"
              className="form-control"
              value={inputEmail}
              placeholder="Email"
              onChange={({ target: { value } }) => setInputEmail(value)}
            />
            <input
              type="password"
              className="form-control"
              value={inputPassword}
              placeholder="Password"
              onChange={({ target: { value } }) => setInputPassword(value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={inputPasswordConfirmation}
              onChange={({ target: { value } }) =>
                setInputPasswordConfirmation(value)
              }
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="overlay-container overlay-container-left">
          <div class="overlay overlayleft">
            <div class="overlay-panel overlay-left">
              <h1>Hello!!!.</h1>
              <p>Already have an account?</p>

              <NavLink to="/login" className="link">
                <button class="ghost" id="signIn">
                  Login
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
