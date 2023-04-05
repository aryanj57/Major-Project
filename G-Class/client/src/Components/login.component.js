import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import google from '../Icons/googlr.png';

import { NavLink } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');

  const Submit = e => {
    e.preventDefault();

    Axios.post(`${URL}/users/login`, {
      username: inputUsername,
      password: inputPassword,
      isGoogle: false,
    })
      .then(res => {
        const token = new Cookies();
        token.set('token', res.data.token, { path: '/', maxAge: 604800 });
        //return to home page
        window.location = '/';
      })
      .catch(() => setError('Something went wrong. Please try again.'));
  };

  return (
    //     <div className="container">
    //       <form className="margin box box-shadow text-dark" onSubmit={Submit}>
    //         <h1 className="box-title">Login user</h1>
    //         <h4 className="form-error">{error}</h4>
    //         <div className="form-group">
    //           <p className="form-label">Email:</p>
    //           <input
    //             type="email"
    //             className="form-control"
    //             value={inputEmail}
    //             onChange={({ target: { value } }) => setInputEmail(value)}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <p className="form-label">Password:</p>
    //           <input
    //             type="password"
    //             className="form-control"
    //             value={inputPassword}
    //             onChange={({ target: { value } }) => setInputPassword(value)}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <p className="form-label">
    //             Don't have account yet?{' '}
    //             <NavLink to="/register" className="link">
    //               Register
    //             </NavLink>
    //           </p>
    //           <p className="form-label">
    //             Log in with google ID{' '}
    //             <NavLink to="/googlelogin" className="link">
    //               Google ID
    //             </NavLink>
    //           </p>
    //         </div>
    //         <div className="form-group">
    //           <input type="submit" className="form-control btn btn-dark" />
    //         </div>
    //       </form>
    //     </div>
    //   );
    // };
    <div className="login">
      <div class="contain" id="contain">
        <div class="form-container sign-in-container">
          <form onSubmit={Submit}>
            <h1>Sign In</h1>
            <NavLink to="/googlelogin">
              <button type="button" class="login-with-google-btn">
                <img src={google} alt="google" className="google"></img> Sign in
                with Google
              </button>
            </NavLink>
            <span>Or</span>
            <input
              type="username"
              placeholder="Username"
              className="form-control"
              value={inputUsername}
              onChange={({ target: { value } }) => setInputUsername(value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={inputPassword}
              onChange={({ target: { value } }) => setInputPassword(value)}
            />
            {/* <div className="form-group">
        <input type="submit" className="form-control btn btn-dark" />
      </div> */}
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h1>Welcome back! Start learning</h1>
              <p>Don't have account yet? </p>
              <p>
                <NavLink to="/register" className="link">
                  <button class="ghost" id="signUp">
                    Sign Up
                  </button>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
