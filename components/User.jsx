import React from 'react';
import classes from "./User.module.css";

function User({userName , done}) {
if(typeof userName === "undefined") {
  return
}

  const random = Math.floor(Math.random() * 5);
  const themeColorArray = ["#FCEAAC","#FDA802","#E555C7","#B7E7F7","#C4C4C6"]
  const color =themeColorArray[random];

  return (
    <>
      <div className="gas kr">
      {/* <span className="number">2</span> */}
      <h2 className="symbol">{userName}</h2>
      <p className="name">30%</p>
    </div>
    </>
  )
}

export default User