import React from "react";
import firebase from "firebase/compat/app"
import { auth } from "./Firebase";
// styles
import styles from "./Login.module.css";
//icons
import googleIcon from "../Svg/google.svg";

const Login = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1>Welcome to Messenger</h1>
        <div
          className={styles.loginButton}
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <img src={googleIcon} alt="google" /> Login with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
