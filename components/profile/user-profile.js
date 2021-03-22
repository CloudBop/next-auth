// import { useState, useEffect } from "react";
// import { getSession } from "next-auth/client";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);
  // // const [loadedSession, setLoadedSession] = useState();
  // useEffect(() => {
  //   //
  //   getSession().then(session => {
  //     if (!session) {
  //       // navigate away - resets app router state
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //       // setLoadedSession(session);
  //     }
  //   });
  // }, []);

  async function changePasswordHandler(passwordData) {
    const response = await fetch("api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(`response`, response);
  }

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
