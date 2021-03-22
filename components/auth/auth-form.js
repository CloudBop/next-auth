import { useRef, useState } from "react";
import { signIn } from "next-auth/client";
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
    // if (!response.ok) {
    //   throw new Error(data.message || "Something went wrong");
    // }
  } catch (error) {
    // console.log(`error`, error);
    throw new Error(error.message || "Something went wrong");
  }

  //
  return data;
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
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    //
    //
    if (isLogin) {
      // log user in
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword
      });

      if (!result.error) {
      }

      // console.log(`LOGGED IN ?`, result);
    } else {
      //
      // TODO validate new user credentials - never trust the client
      // create new user
      // console.log(`Iran`);
      try {
        const result = await createUser(enteredEmail, enteredPassword);
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
