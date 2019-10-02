import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Typography from '@material-ui/core/Typography';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WithAuth = (props) => {
  const [signedIn, setSignedIn] = useState(false);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  const onAuthChange = (user) => {
    setSignedIn(Boolean(user));
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onAuthChange);
    return () => unsubscribe();
  })

  const renderLogin = () => {
    return (
      <LoginContainer>
        <Typography variant="h3" color="primary">
          Welcome To Web Calendar App
        </Typography>
        <br/>
          <Typography variant="h6">Please sign in</Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </LoginContainer>
    )
  }

  return (
    signedIn
      ? props.children
      : (renderLogin())
  )
};

export default WithAuth;
