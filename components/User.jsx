import React from 'react';
import classes from "./User.module.css";

function User({userName , done ,isHost}) {
if(typeof userName === "undefined") {
  return
}

  const random = Math.floor(Math.random() * 8);
  const themeColorArray = ["#FCEAAC","#fccb69","#9ded87","#B7E7F7", "#fcfcfc","#e555c7","#099FFF","#FF0099"]
  const color =themeColorArray[random];

  return (
    <>
      <div className={`${classes.gas} ${classes.kr}`} style={{color:color,boxShadow:`0px 0px 20px ${color}`}}>
      {/* <span className="number">2</span> */}
      <h2 className={classes.symbol} style={{color:color,textShadow:`0px 0px 20px ${color}`}}>{userName}</h2>
      <p className="name" style={{color:color,textShadow:`0px 0px 20px ${color}`}} >{done}</p>
    </div>
    </>
  )
}

export default User