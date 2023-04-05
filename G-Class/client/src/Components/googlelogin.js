import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { NavLink } from 'react-router-dom';

const URL = process.env.REACT_APP_BACKEND_URL;
const clientId =
  '580717662016-bggov4v63t73bv56s14ctieda9dn36da.apps.googleusercontent.com';

function Googlelogin() {
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleLoginSuccess = response => {
    console.log('Login Success ', response);
    // console.log(response.Rs.Ct);
    setUser(response.profileObj);
    setLoading();
    Axios.post(`${URL}/users/googlelogin`, {
      email: response.Rs.Ct,
      name: response.Rs.Qe,
      isGoogle: true,
      token: response.accessToken,
    })
      .then(res => {
        const token = new Cookies();
        token.set('token', res.data.token, { path: '/', maxAge: 604800 });
        //return to home page
        window.location = '/';
      })
      .catch(() => setError('Something went wrong. Please try again.'));
  };

  const handleLoginFailure = error => {
    console.log('Login Failure ', error);
    setLoading();
  };

  const handleLogoutSuccess = response => {
    console.log('Logout Success ', response);
    setUser(null);
  };

  const handleLogoutFailure = error => {
    console.log('Logout Failure ', error);
  };

  const handleRequest = () => {
    setLoading('Loading...');
  };

  const handleAutoLoadFinished = () => {
    setLoading();
  };

  return (
    <div>
      {user ? (
        <div>
          {/* <div className="name">Welcome {user.name}!</div> */}
          <GoogleLogout
            clientId={clientId}
            onLogoutSuccess={handleLogoutSuccess}
            onFailure={handleLogoutFailure}
          />
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
        />
      )}
    </div>
  );
}
export default Googlelogin;
