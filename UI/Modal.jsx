import React from 'react'
import classes from "./Modal.module.css";

function Modal({children,title,color="violet"}) {
  return (
    <div style={{border:`2px solid ${color}`,boxShadow:`0px 0px 20px ${color}`}} className={classes.Modal}>
      <h1 className={classes.title} style={{color:color,textShadow: `0px 0px 20px ${color}`}}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}

export default Modal