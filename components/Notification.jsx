import React from 'react';
import classes from "../styles/Notification.module.css";
import Image from "next/image";

function Notification({name = "Test"}) {
  return (
    <div className={classes.NotificationModal}>
   <div className={classes.NotificationContents}>
    <Image src="/anounce.png" width="100px" height="100px"/>
    <h2><span>{name}</span> Join the Room</h2>
   </div>
    </div>
  )
}

export default Notification