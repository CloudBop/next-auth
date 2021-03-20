import { useRef, useState } from "react";
import classes from "./auth-form.module.css";

async function createUser(email, password) {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    //
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(`error`, error);
    throw new Error(error.message || "Something went wrong");
  }

  // if (!response.ok) {
  //   throw new Error(data.message || "Something went wrong");
  // }
  //
}

function AuthForm() {
  const emailRef = useRef("initialValue");
  const passwordRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin(prevState => !prevState);
  }

  async function submitHandler(evnt) {
    evnt.preventDefault();
    const newUserPassword = passwordRef.current.value;
    const newUserEmail = emailRef.current.value;
    //
    console.log(newUserEmail, newUserPassword);
    //
    if (isLogin) {
      // log user in
    } else {
      //
      // TODO validate new user credentials - never trust the client
      // create new user
      try {
        const result = await createUser(newUserEmail, newUserPassword);
        console.log(result);
      } catch (error) {
        //
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
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
}

export default AuthForm;
