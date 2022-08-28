import React from 'react';
import classes from "./User.module.css";

function User({userName, done}) {
  return (
    <div className={classes.user}>
      <h1 className={classes.userName}>{userName}</h1>
      <p className={classes.done}>{done}</p>
    </div>
  )
}

export default User