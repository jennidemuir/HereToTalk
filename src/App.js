import React, { useState, useEffect } from "react";

import "./App.css";

import Buttons from "./Components/Buttons/Buttons.jsx";
import Header from "./Components/Header/Header.jsx";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Channel from "./Components/Channel/Channel";

import image from "./Utilities/Images/talk.jpg";
import blueImage from "./Utilities/Images/blue.jpg";

firebase.initializeApp({
  apiKey: "AIzaSyBeAmZ4XpnjNf_ukccTmVEdKcA7H_U2654",
  authDomain: "firechat-8f003.firebaseapp.com",
  projectId: "firechat-8f003",
  storageBucket: "firechat-8f003.appspot.com",
  messagingSenderId: "1017806166112",
  appId: "1:1017806166112:web:0b8f95287faff3d35d0b05",
  measurementId: "G-8WEWNY2C7H",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  const unsubscribe = useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //Set language to thedefault browser preference

    firebase.auth().useDeviceLanguage();
    //Start sign in process

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading...";

  return (
    <div>
      {user ? (
        <div className="body">
          <Header user={user} auth={auth} signOut={signOut} />
          {/* <Buttons onClick={signOut}>Sign out</Buttons> */}
          {/* <div className="img-container">
            <img className="img" src={image} />
          </div> */}
          <div className="channel-container">
            <Channel user={user} db={db} />
          </div>
        </div>
      ) : (
        <div className="signIn-body">
          <div className="titleConatainer">
            <h1 className="title">A Chat App for When You Need to Talk</h1>
          </div>
          <div className="img-container">
            <img className="img-signIn" src={blueImage} />
          </div>
          <div className="buttonContainer">
            <Buttons className="signInButton" onClick={signInWithGoogle}>
              {" "}
              Sign in with Google
            </Buttons>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
