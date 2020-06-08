import React, { useState, useEffect } from "react";
import "./App.css";

import styled from "styled-components";
import { Container, Button } from "reactstrap";

import { GoogleLogin, GoogleLogout } from "react-google-login";

const Title = styled.h1`
  text-align: center;
  padding: 1rem;
  background-color: #6c757d;
  color: white;
`;
const ButtonBar = styled.div`
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
`;

const GOOGLE_CLIENT_ID = "891271447458-2tacoegsns3ccft1b88g46t3a0kkn6ep.apps.googleusercontent.com";

const App = () => {
  const [loggedIn, setLogin] = React.useState(false);
  const [currPlayer, setPlayer] = React.useState(null);


  const handleGoogleLogin = (response) => {
  fetch('/login', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${response.tokenId}`,
    },
  }).then((fetchResponse) => {
    if (!fetchResponse.ok) {
      alert('Unable to authenticate', fetchResponse.statusText);
      setLogin(false);
    } else {
      setLogin(true);
    }
  });
};

  const handleGoogleFailure = response => {
    alert(response.error);
  };

  const handleGoogleLogout = () => {
    fetch("/logout", {
      method: "POST"
    }).then(fetchResponse => {
      if (!fetchResponse.ok) {
        alert("Error logging out", fetchResponse.statusText);
      }
      setLogin(false);
    });
  };

  const loginButton = (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      isSignedIn
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleFailure}
    />
  );
  const logoutButton = (
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={handleGoogleLogout}
    />
  );

  return (
    <div>
      <Title>Log-In Tests</Title>
      <ButtonBar>
        {!loggedIn && loginButton} {loggedIn && logoutButton}
      </ButtonBar>
    </div>

  );


};

export default App;
