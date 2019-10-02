import React, { useState, useEffect} from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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

  return (
    signedIn 
      ? props.children
      : (<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>)
  )
};

export default WithAuth;
