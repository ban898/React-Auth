import classes from "./ProfileForm.module.css";
import React, { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const newPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCHThAvu4yhVsV1GA0qDpxp14LhEFDDaow",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordRef}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
