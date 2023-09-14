import { useState, useRef, useContext } from "react";
import AuthContext from "../store/Auth-Context";
import classes from "./AuthForm.module.css";
import {useHistory} from "react-router-dom"

const AuthForm = () => {
  
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const AuthCtx = useContext(AuthContext);
  const history=useHistory()

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    let url;
    let requestBody = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true, // Corrected the spelling of 'returnSecureToken'
    };

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCF_6Se4K8su8XTvm_WAL7etYtBWD35ywY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCF_6Se4K8su8XTvm_WAL7etYtBWD35ywY";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (!response.ok) {
       // const data = await response.json();
        let errorMsg = "Authentication failed!";

       // if (data && data.error && data.error.message) {
       //   errorMsg = data.error.message;
       // }

        throw new Error(errorMsg);
      }

      const data = await response.json();
      AuthCtx.login(data.idToken); 
      history.replace("/")

    
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p>Sending Request.....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
